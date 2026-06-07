import React, {useEffect, useMemo, useState} from "react";
import "../../pages/Match/Match.css";
import LostItemDetailBox from "../../features/items/LostItemDetailBox";
import Button from "../../components/Button";
import ItemCard from "../../components/ItemCard"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../data/supabase";
import { mapItem } from "../../data/mapItem";
import ModalItemDetailsStudentView from "../../features/items/ModalItemDetailsStudentView";
import ModalItemDetailsAdmin from "../../features/items/ModalItemDetailsAdmin";

// later the lost item will be send in the form of an index to ensure data not lost when reloading
const Match = () => {
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [lostItem, setLostItem] = useState(location.state?.item || null);
  const isAdmin = location.state?.isAdmin || false; 
  console.log("isAdmin in matchpage",isAdmin)

  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const handleClaimSuccess = async (foundId)=>{
    try{
      const {error:updateLostError} = await supabase
        .from("LostReport")
        .update({claimed:true})
        .eq("item_id", lostItem.id)
      
      if (updateLostError) throw updateLostError

      console.log("Lost report marked as claimed!")
      fetchData() // refresh list
    }catch (e){
      console.error("Failed to update lost report:", e)
    }
  }
  async function fetchData() {
    setLoading(true);
    
    try{
      // Fetch lost items
      if (!lostItem){
        const {data: itemData, error} = await supabase
          .from("Item")
          .select("*")
          .eq("item_id", id)
          .single();
        
        if (error) {
          console.error("Error fetching lost item:", error);
          return;
        }
        
        setLostItem(mapItem(itemData));
      } 

      // Fetch all found item
      const {data: foundReports, error: foundError} =
        await supabase
          .from("FoundReport")
          .select(`
            found_id,
            created_at,
            Item (*)
          `);
      
      if (foundError) {
        console.error("Error fetching found reports:", foundError);
        return;
      }

      const{data:claimedData, error:claimError}= await supabase
        .from("Claim")
        .select("found_id")
      //make all the found ids into a set
      const claimedFoundIds= new Set (claimedData.map(c=>c.found_id))

      const mappedFoundItems = foundReports
        .filter(report=>!claimedFoundIds.has(report.found_id))//only get unclaimed items
        .map(report => ({
          ...mapItem(report.Item),

          // preserve FoundReport data
          foundId: report.found_id,

          // use report submission date instead of item creation date
          date: report.created_at?.split("T")[0]
        }));

      setFoundItems(mappedFoundItems);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }
  
  console.log("lostItem", lostItem)


  // calculate match score
  function calculateMatchScore(lostItem, foundItem) {
    let score = 0;
    
    // campus being absolute
    if (lostItem.campus?.toLowerCase() !== foundItem.campus?.toLowerCase()) {
      return -1;
    }

    // floor
    if (lostItem.floor === foundItem.floor){
      score += 5;
    }

    // category
    if (lostItem.category === foundItem.category){
      score += 5;
    }

    // location
    if (lostItem.location?.toLowerCase() === foundItem.location?.toLowerCase()){
      score += 5;
    }

    // color, since it is array, will try to get every matching ones as +2
    const commonColors = lostItem.color?.filter(color => foundItem.color?.some(c => c.toLowerCase() === color.toLowerCase())) || [];
    score += commonColors?.length * 2;

    // title
    score += getWordSimilarity(lostItem.title, foundItem.title) * 2;

    // item description
    score += getWordSimilarity(lostItem.description, foundItem.description) * 2;

    // location description
    score += getWordSimilarity(lostItem.locationDescription, foundItem.locationDescription) * 2;

    return score;
  }

  // get word similarity
  function getWordSimilarity(text1 = "", text2 = "") {
    const words1 = new Set(
      text1.toLowerCase().split(/\s+/)
    );

    const words2 = new Set(
      text2.toLowerCase().split(/\s+/)
    );

    return [...words1].filter(word =>
      words2.has(word)
    ).length;
  }

  // sort highest scored items
  const matchedItems = useMemo(() => {
    if (!lostItem) {
      return [];
    };
    
    return foundItems.map(item => ({
      ...item,
      matchScore: calculateMatchScore(lostItem, item)
    }))
    .filter(item => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  }, [lostItem, foundItems])

  return (
    <div className="match-page">
        <Button
            type="back"
            label="Back"
            onClick={() => navigate(-1)}
        />

        {lostItem ? (
          <LostItemDetailBox item={lostItem} />
        ) : (
          <p>Item not found</p>
        )}

        <h2>Possible Matches</h2>

        {/* for the matching item card  */}
        <div className="match-grid">
          {matchedItems.length > 0 ? (
              matchedItems.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={(clickedItem) => {
                      setSelectedItem(clickedItem);
                      setShowItemDetails(true);
                    }}
                  />
              ))
          ) : (
              <div className="empty-state">
                  No matching items found.
              </div>
          )}
      </div>

      {showItemDetails && selectedItem && (
        isAdmin? (
          <ModalItemDetailsAdmin
            item={selectedItem}
            onClose={() => setShowItemDetails(false)}
            viewLostReports={"Found Reports"}
            onClaimSuccess={handleClaimSuccess} 
          />
        ) : (
          <ModalItemDetailsStudentView
            item={selectedItem}
            onClose={() => setShowItemDetails(false)}
          />
        )
      )}
    </div>
  );
};

export default Match;
