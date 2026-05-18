// only admin can access it
//to do list: proper image validation,
//  submission validation,
//  make css pretty,
//  link to post lost item

import "./PostFound.css";
import React from "react";
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import DropdownRadio from "../../components/DropdownRadio";
import DropdownCheckBox from "../../components/DropdownCheckBox";
import NumberTicker from "../../components/NumberTicker";
import plus from "../../assets/plus-svgrepo-com.svg";
import close from "../../assets/cancel-close-svgrepo-com.svg";
import dummy from "../../assets/water_bottle.jpeg";
import CalendarFilter from "../../features/filters/CalendarFilter";

const PostFound = () => {
  const [campus, setCampus] = useState("Alam Sutera");
  const [location, setLocation] = useState("Canteen");
  const [category, setCategory] = useState("Category");
  const [colour, setColour] = useState("");
  const [inputs, setInputs] = useState({});
  const [lostDate, setlostDate] = useState("");

  const [imgSrc, setImgSrc] = useState(null)
  const [imgInfo, setImgInfo] = useState(null)
  const [imgSize, setImgSize] = useState(null)
  const [imgReady, setimgReady] = useState(false)

  //got from https://www.youtube.com/watch?v=SMim5-ox0K4
  // ideally this portion would be in the components folder but imgSrc is required to pass on and I have no idea how to pass on these variables
  const ImgUpload = () => {

    const handleDragOver = e => {
      e.preventDefault()
      // console.log(e.dataTransfer.files)
    }

    const handleDrop = e => {
      e.preventDefault()
      console.log(e.dataTransfer.files)

      handleFiles(e.dataTransfer.files)
    }

    const handleImgInput = e => {
      console.log(e.target.files)
      handleFiles(e.target.files)

    }

    const handleFiles = files => {
      if (!files) return
      const file = files[0]

      if (file.size < 10000000 && (file.type.includes("image/png") || file.type.includes("image/jpg") || file.type.includes("image/jpeg"))) {
        setimgReady(true);
      } else {
        setimgReady(false);
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => (
        setImgSrc(reader.result),
        setImgInfo(file.type),
        setImgSize((file.size * 0.000001).toFixed(3))
      )
    }

    const uploadContent = (
      <label onDragOver={handleDragOver} onDrop={handleDrop} className="image-upload" htmlFor="img-upload">
        <img src={plus} alt="" />
        <span>Insert Image here</span>
        <span>(jpg, png)</span>
        <span>max file size 10mb</span>

        <input onChange={handleImgInput} type="file" name="image-upload" id="img-upload" />
      </label>
    )

    const previewContent = (
      <div className="img-preview">
        <img src={imgSrc} alt="" />
        <div className="overlay">
          <span>Type: {imgInfo}</span>
          <span>Size: {imgSize} MB</span>
          <span>Ready: {imgReady.toString()}</span>
          <button onClick={() => setImgSrc(null)} className="close-btn">
            <img src={close} alt="" />
          </button>
        </div>

      </div>
    )

    return imgSrc ? previewContent : uploadContent
  }

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    console.log(inputs)
  }

  //submit button
  const handleSubmit = (e) => {
    e.preventDefault()
    let {itemName, personName, descitems, descloc, floor, lostDate} = inputs;

    const itemtry = {
      "itemName": itemName,
      "personName": personName,
      "descloc":descloc,
      "descitems":descitems,
      "floor": floor,
      "campus": campus,
      "location": location,
      "category": category,
      "colour": colour,
      "lostDate": lostDate,
      "imgSrc": imgSrc

    }
    if (imgReady) {
      console.log(imgReady)
      console.log(itemtry)
    } else {
      console.log("Cannot go!")
    }

  }
  return (
    <div className="layout_found">
      <ImgUpload />
      {/* uploads image */}

      <form>
        {/* do not move the dropdowns into the inside of the forum as it causes a weird instant reload thing*/}
        <label>Item Name
          <input
            type="text"
            name="itemName"
            value={inputs.itemName}
            onChange={handleChange}
          />
        </label>
        <label>Your Name (Founder of the item)
          <input
            type="text"
            name="personName"
            value={inputs.personName}
            onChange={handleChange}
          />
        </label>
        <label>desc item
          <textarea name="descitems" value={inputs.descitems} onChange={handleChange}>Item:</textarea>
        </label>

        <label>desc location
          <textarea name="descloc" value={inputs.descloc} onChange={handleChange}>Location:</textarea>
        </label>

        <label htmlFor="">Floor
          <input type="number" name="floor" min="0" max="20" value={inputs.floor} onChange={handleChange} />
        </label>

        <label htmlFor="">Date Lost:
          <input type="date" name="lostDate" value={inputs.lostDate} onChange={handleChange}></input>
        </label>

      </form>

      <Dropdown label={campus} type="campus">
        <DropdownRadio
          name="campus"
          options={[
            "Alam Sutera",
            "Anggrek",
            "Bandung", 
            "Bekasi", 
            "Malang", 
            "Semarang", 
            "Senayan", 
            "Syahdan & Kijang"
          ]}
          selected={campus}
          setSelected={setCampus}
        />
      </Dropdown>

      <Dropdown label={location} type="location">
        <DropdownRadio
          name="location"
          options={[
            "Canteen",
            "Classroom", 
            "Gym", 
            "Hallway", 
            "Lift Area", 
            "LKC", 
            "Lobby", 
            "Parking Lot", 
            "Toilet", 
            "Others"
          ]}
          selected={location}
          setSelected={setLocation}
        />
      </Dropdown>

      <Dropdown label={category} type="category">
        <DropdownRadio
          name="category"
          options={[
            "Accessories",
            "Bottle",
            "Clothing",
            "Documents",
            "Electronics",
            "ID Card",
            "Stationery"
          ]}
          selected={category}
          setSelected={setCategory}
        />
      </Dropdown>

      <Dropdown label={"Colours: " + [colour]} type="colour">
        <DropdownCheckBox
          name="color"
          options={[
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue",
            "Purple",
            "Pink",
            "Brown",
            "Black",
            "White",
            "Grey"
          ]}
          selected={colour}
          setSelected={setColour}
        />
      </Dropdown>
      {/* <CalendarFilter
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      /> */}
      
      <button onClick={handleSubmit}>Submit</button>

    </div>

  )
};

export default PostFound;