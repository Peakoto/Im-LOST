import React, {useEffect, useMemo, useState} from "react";
import LostItemDetailBox from "../../features/items/LostItemDetailBox";
import Button from "../../components/Button";
import ItemCard from "../../components/ItemCard"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../data/supabase";
import { mapItem } from "../../data/mapItem";

// later the lost item will be send in the form of an index to ensure data not lost when reloading
const Match = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [lostItem, setLostItem] = useState(location.state?.item || null);

  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

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
          .select('found_id, Item(*)');
      
      if (foundError) {
        console.error("Error fetching found reports:", foundError);
        return;
      }

      const mappedFoundItems = foundReports
        .map(report => mapItem(report.Item));

      setFoundItems(mappedFoundItems);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }
  

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
            {matchedItems.map(item => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    </div>
  );
};

export default Match;