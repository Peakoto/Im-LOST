import React, {useState} from "react";
import ItemCard from "../../components/ItemCard";
import "./Home.css";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import DropdownRadio from "../../components/DropdownRadio";
import ModalFilter from "../../features/items/ModalFilter";
import SearchBar from "../../components/SearchBar";
import ModalItemDetailsStudentView from "../../features/items/ModalItemDetailsStudentView";
import mockItems from "../../data/mockItems.js";

// later when backend is done
// import { getItems } from "../../api/itemApi"; 

// later on, to implement the backend, use the url
// ex -> image: "http://localhost:5000/uploads/image.jpg"

const Home = () => {
  // mock items or dummies 
  const items = mockItems;
  // later replace mockItems with
  // const [items, setItems] = useState([]);

  // defaulting the campus dropdown
  const [campus, setCampus] = useState("Alam Sutera");

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


  // filtering the item based on the applied filters
  const filteredItems = items
    .filter((item) => {

    // campus filter
    const matchesCampus = item.campus === campus;

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
      appliedColor.length === 0 || item.color.some((color) => appliedColor.includes(color));

    // search bar
    const matchesSearchTitle =
      !searchTitle || item.title.toLowerCase().includes(searchTitle.toLowerCase());
    
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
        {/* Search Barr */}
        <SearchBar onSearch={setSearchTitle} />

        {/* Campus Dropdown */}
        <Dropdown label={campus}>
          <DropdownRadio
            name="campus"
            options={["Alam Sutera", "Anggrek", "Bandung", "Bekasi", "Malang", "Semarang", "Senayan", "Syahdan & Kijang"]}
            selected={campus}
            setSelected={setCampus}
          />
        </Dropdown>
        
        {/* Filter Layout Button */}
        <Button 
          type="filter"
          label="Filter"
          onClick={() => setShowFilter(true)}
        />

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
          <ModalItemDetailsStudentView
            item={selectedItem}
            onClose={() => setShowItemDetails(false)}
          />
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
        {filteredItems.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            onClick={(clickedItem) => {
              setSelectedItem(clickedItem);
              setShowItemDetails(true);
            }}
          />
        ))}
      </div>
    </div> 
  )
}

export default Home;