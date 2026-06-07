import React, {useState, useEffect} from "react";
import ItemCard from "../../components/ItemCard";
import "./Home.css";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import DropdownRadio from "../../components/DropdownRadio";
import ModalFilter from "../../features/items/ModalFilter";
import SearchBar from "../../components/SearchBar";
import ModalItemDetailsStudentView from "../../features/items/ModalItemDetailsStudentView";
import ModalItemDetailsAdmin from "../../features/items/ModalItemDetailsAdmin";
import filterIcon from "../../assets/filter_icon.png";
import { supabase } from "../../data/supabase";
import { mapItem } from "../../data/mapItem";

const Home = ({isAdmin}) => {

  // loading state
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
    // defaulting the campus dropdown
  const [campus, setCampus] = useState("Alam Sutera");
  const [viewLostReports,setViewLostReports] = useState("Found Reports");
  const [showFilter, setShowFilter] = useState(false);
  // for the calender filter
  const [appliedStartDate, setAppliedStartDate] = useState("");
  const [appliedEndDate, setAppliedEndDate] = useState("");
  // for those filters that uses dropdown radio
  const [appliedCategory, setAppliedCategory] = useState("");
  const [appliedLocation, setAppliedLocation] = useState("");
  const [appliedSortBy, setAppliedSortBy] = useState("");
  // for those filters that uses dropdown checkbox
  const [appliedColor, setAppliedColor] = useState([]);
  // for tat search bar
  const [searchTitle, setSearchTitle] = useState("");
  // popup states for the item card
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 
  console.log("isAdmin state is:",isAdmin)

  const lostReportItems = async()=>{
    const { data, error } = await supabase
      .from("LostReport")
      .select(`
        lost_id,
        created_at,
        date_lost,
        Item (*)
      `)
      .eq("claimed", false);
    if (error) throw error;

    return data.map((report) => {
      const item = mapItem(report.Item);
      return {
        ...item,
        lostId: report.lost_id,
        reportCreatedAt: report.created_at,
        dateLost: report.date_lost,
      };
    }); 
  }
  const foundReportItems= async ()=>{
    //function to get found report items taht are unclaimed

    const { data, error } = await supabase
      .from("FoundReport")
      .select(`
        found_id,
        created_at,
        date_found,
        Item (*)
      `);
        
    if (error) throw error;

    //gett all found_id from 
    const{data:claimedData,error:claimError} = await supabase
      .from("Claim")
      .select("found_id")
    if (claimError) throw claimError;
    //make ids into a set
    const claimedFoundIds = new Set(claimedData.map(c=>c.found_id))
    const unclaimedItems = data.filter(i=>!claimedFoundIds.has(i.found_id))

    return unclaimedItems.map((report) => {
      const item = mapItem(report.Item);
      return {
        ...item,
        foundId: report.found_id,
        reportCreatedAt: report.created_at,
        dateFound: report.date_found,
      };
    }); 
  }

  const fetchItems = async () => {
    try {
      setLoading(true);

      let formattedItems;

      if (viewLostReports ==="Found Reports"){
        formattedItems= await foundReportItems();
      }else{
        formattedItems = await lostReportItems();
      }
      
      setItems(formattedItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const test = async () => {
      console.log("Testing auth");

      try {
        const result = await Promise.race([
          supabase.auth.getSession(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout after 5 seconds")), 5000)
          ),
        ]);

        console.log("Session result:", result);
      } catch (err) {
        console.error("Session test failed:", err);
      }
    };

    test();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [viewLostReports]); 

  // filtering the item based on the applied filters
  const filteredItems = items
    .filter((item) => {

    // campus filter
    const matchesCampus =
      item.campus?.trim().toLowerCase() === campus.trim().toLowerCase();

    console.log({
      dbCampus: item.campus,
      selectedCampus: campus,
      equal: item.campus?.trim().toLowerCase() === campus.trim().toLowerCase()
    });

    // convert item date
    const itemDate = new Date(item.date);

    // calendar
    const matchesStart =
      !appliedStartDate || itemDate >= new Date(appliedStartDate);

    const matchesEnd =
      !appliedEndDate || itemDate <= new Date(appliedEndDate);

    // category
    const matchesCategory =
      !appliedCategory || item.category === appliedCategory;

    // location
    const matchesLocation =
      !appliedLocation || item.location === appliedLocation;

    // color
    const matchesColor =
      appliedColor.length === 0 || (Array.isArray(item.color) && item.color.some((color) => appliedColor.includes(color)));

    // search bar
    const matchesSearchTitle =
      !searchTitle || (item.title || "").toLowerCase().includes(searchTitle.toLowerCase());

    console.log({
      title: item.title,
      matchesCampus,
      matchesStart,
      matchesEnd,
      matchesCategory,
      matchesLocation,
      matchesColor,
      matchesSearchTitle,
    });
    
    return (
        matchesLocation &&
        matchesStart &&
        matchesEnd &&
        matchesCampus &&
        matchesCategory &&
        matchesColor &&
        matchesSearchTitle
    );
  })

  .sort((a, b) => {

    // newest first
    if (appliedSortBy === "Newest") {
      return new Date(b.date) - new Date(a.date);
    }

    // oldest first
    if (appliedSortBy === "Oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    // alphabetical A-Z
    if (appliedSortBy === "A-Z") {
      return a.title.localeCompare(b.title);
    }

    // alphabetical Z-A
    if (appliedSortBy === "Z-A") {
      return b.title.localeCompare(a.title);
    }
    // default
    return 0;
  });

  return (
    <div className="home">
      <div className="top">

        {/* Filter Layout Button */}
        <Button 
          type="filter"
          icon={filterIcon}
          iconOnly={true}
          onClick={() => setShowFilter(true)}
        />

        {isAdmin?(
          <Dropdown label={viewLostReports} type="viewLostReports">
          <DropdownRadio
            name="viewLostReports"
            options={["Found Reports","Lost Reports"]}
            selected={viewLostReports}
            setSelected={setViewLostReports}
          />
          </Dropdown>
        ):(
          null
        )}
        

        {/* Campus Dropdown */}
        <Dropdown label={campus} type="campus">
          <DropdownRadio
            name="campus"
            options={["Alam Sutera", "Anggrek", "Bandung", "Bekasi", "Malang", "Semarang", "Senayan", "Syahdan & Kijang"]}
            selected={campus}
            setSelected={setCampus}
          />
        </Dropdown>

        {/* Search Barr */}
        <SearchBar onSearch={setSearchTitle} />

        {/* the filter applier */}
        {showFilter && (
          <ModalFilter
            onClose={() => setShowFilter(false)}

            // calender
            appliedStartDate={appliedStartDate}
            appliedEndDate={appliedEndDate}
            setAppliedStartDate={setAppliedStartDate}
            setAppliedEndDate={setAppliedEndDate}

            // Category
            appliedCategory={appliedCategory}
            setAppliedCategory={setAppliedCategory}

            // Location
            appliedLocation={appliedLocation}
            setAppliedLocation={setAppliedLocation}

            // SortBy
            appliedSortBy={appliedSortBy}
            setAppliedSortBy={setAppliedSortBy}

            // Color
            appliedColor={appliedColor}
            setAppliedColor={setAppliedColor}
          />
        )}

        {/* Item Details Rendering */}
        
        {showItemDetails && selectedItem && (
          isAdmin /*&& viewLostReports === "Found Reports"*/ ? (
            <ModalItemDetailsAdmin
              item={selectedItem}
              onClose={() => setShowItemDetails(false)}
              viewLostReports={viewLostReports}
              isAdmin={isAdmin}
            />
          ) : (
            <ModalItemDetailsStudentView
              item={selectedItem}
              onClose={() => setShowItemDetails(false)}
              isAdmin={isAdmin}
            />
          )
        )}

        {/* Nav Post Lost Item Page Button */}
        <Button 
          type="post"
          label="Post Lost Item"
          to="post-lost"
        />

        {/* Nav Post Found Item Page Buttom */}
        <Button 
          type="post"
          label="Post Found Item"
          to="post-found"
        />
      </div>
      
      {/* The Grid for those items */}
      <div className="grid">

      {loading ? (
        <div className="empty-state">
          Fetching items...
        </div>
      ) : filteredItems.length > 0 ? (

        filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            viewLostReports={viewLostReports}
            onClick={(clickedItem) => {
              setSelectedItem(clickedItem);
              setShowItemDetails(true);
            }}
          />
        ))

      ) : (

        <div className="empty-state">
          No items found.
        </div>

      )}

    </div>
    </div> 
  )
}

export default Home;