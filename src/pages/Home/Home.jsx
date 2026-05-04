import React, {useState} from "react";
import ItemCard from "../../components/ItemCard";
import "./Home.css";
import placeholder from "../../assets/water_bottle.jpeg";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import DropdownRadio from "../../components/DropdownRadio";


// later on, to implement the backend, use the url
// ex -> image: "http://localhost:5000/uploads/image.jpg"

const Home = () => {
  const [location, setLocation] = useState("Alam Sutera");

  const items = [
    {
      id: 1,
      title: "Lost Glass Bottle (a)",
      location: "Alam Sutera",
      date: "4/5/2026",
      image: placeholder,
      category: "Bottle"
    },
    {
      id: 2,
      title: "Lost Glass Bottle (a)",
      location: "Alam Sutera",
      date: "4/5/2026",
      image: placeholder,
      category: "Bottle"
    },
    {
      id: 3,
      title: "Lost Glass Bottle (a)",
      location: "Alam Sutera",
      date: "4/5/2026",
      image: placeholder,
      category: "Bottle"
    },
    {
      id: 4,
      title: "Lost Glass Bottle (a)",
      location: "Alam Sutera",
      date: "4/5/2026",
      image: placeholder,
      category: "Bottle"
    },
    {
      id: 5,
      title: "Lost Glass Bottle (b)",
      location: "Bandung",
      date: "4/5/2026",
      image: placeholder,
      category: "Bottle"
    },
    {
      id: 6,
      title: "Lost Glass Bottle (b)",
      location: "Bandung",
      date: "4/5/2026",
      image: placeholder,
      category: "Bottle"
    },
    {
      id: 7,
      title: "Lost Glass Bottle (b)",
      location: "Bandung",
      date: "4/5/2026",
      image: placeholder,
      category: "Bottle"
    },
    {
      id: 8,
      title: "Lost Glass Bottle (a)",
      location: "Alam Sutera",
      date: "4/5/2026",
      image: placeholder,
      category: "Bottle"
    },
  ]

  const filteredItems = items.filter(
    (item) => item.location === location
  )

  return (
    <div className="home">
      <div className="top">
        <Dropdown label={location}>
          <DropdownRadio
            name="location"
            options={["Alam Sutera", "Anggrek", "Bandung", "Bekasi", "Malang", "Semarang", "Senayan", "Syahdan & Kijang"]}
            selected={location}
            setSelected={setLocation}
          />
        </Dropdown>

        <Button 
          type="filter"
          label="Filter"
          // to="../../auth/ModalFilter.jsx"
        />

        <Button 
          type="post"
          label="Post Lost Item"
          // to="../Post_lost/PostLost.jsx"
        />

        <Button 
          type="post"
          label="Post Found Item"
          // to="../Post_found/PostFound.jsx"
        />
      </div>

      <div className="grid">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div> 
  )
}

export default Home;