import React, { useEffect, useMemo, useState, useRef } from "react";
import "./ModalItemDetailsStudentEdit.css";
import Button from "../../components/Button.jsx";
import uploadIcon from "../../assets/upload_icon.png";
import { supabase } from "../../data/supabase.js";
import { updateItem, updateLostReport } from "../../api/itemApi.js";
import imageIcon from "../../assets/image_icon.png";

const ModalItemDetailsStudentEdit = ({ item, onClose }) => {
  const initial = useMemo(() => {
    const colorArray = Array.isArray(item?.color)
      ? item.color
      : item?.color
        ? [item.color]
        : [];

    return {
      image: item?.image ?? "",
      title: item?.title ?? "",
      founder: item?.founder ?? "",
      date: item?.date ?? "",
      location: item?.location ?? "",
      campus: item?.campus ?? "",
      category: item?.category ?? "",
      color: colorArray,
      description: item?.description ?? "",
      locationDescription: item?.locationDescription ?? "",
      floor: item?.floor ?? "",
    };
  }, [item]);

  const [form, setForm] = useState(initial);
  const [original, setOriginal] = useState(initial);

  useEffect(() => {
    setForm(initial);
    setOriginal(initial);
  }, [initial]);

  if (!item) return null;

  const handleSave = async () => {
    console.log("Selected Item: ", item);

    if (!validateForm()) return;

    // img size limiter
    if (imgFile && (imgFile.size > 10_000_000 || !["image/png", "image/jpeg", "image/jpg"].includes(imgFile.type))) {
      alert("Iamge must be JPG/PNG and less than 10MB.")
      return;
    }


    try{
      let imageURL = form.image;

      // UPload image if user selected a new file
      if(imgFile){
        const fileExt = imgFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const {error: uploadError} = await supabase.storage
          .from("images_LostandFound")
          .upload(fileName, imgFile);

          if(uploadError) throw uploadError;

          const{data: urlData} = supabase.storage
            .from("images_LostandFound")
            .getPublicUrl(fileName);

          imageURL = urlData.publicUrl;
      }

      // map data to match supabase Item table
      const mapDataSupabase = {
        item_name: form.title,
        campus_location: form.campus,
        location: form.location,
        item_category: form.category,
        item_color: form.color,
        floor: form.floor ?? "",
        location_description: form.locationDescription,
        item_description: form.description,
        imageURL: imageURL, // assuming you store base64 or URL
      };

      console.log("mapDataSupabase", mapDataSupabase);

      await updateItem(item.item_id, mapDataSupabase);

      console.log("Updating lost report", item.lost_id);

      await updateLostReport(item.lost_id, {
        date_lost: form.date,
      })

      setOriginal(form);
      alert("Item saved successfully!");
      onClose?.();
    } catch (err){
      console.log(err);
      alert("Failed to save item: " + err.message);
    }
  };

  // validate if all form is filled
  const validateForm = () => {
    const requiredFields = ["title", "date", "campus", "location", "category", "floor"];

    for (const field of requiredFields){
      const value = form[field];

      if (
        value === null ||
        value === undefined ||
        String(value).trim() === ""
      ) {
        alert(`Field ${field} is required`);
        return false;
      }

      if (form.color.length === 0) {
        alert("Please select at least one color");
        return false;
      }
    }

    return true;
  }

  

  const campusOptions = [
    "Alam Sutera",
    "Anggrek",
    "Bandung",
    "Bekasi",
    "Malang",
    "Semarang",
    "Senayan",
    "Syahdan & Kijang",
  ];

  const locationOptions = [
    "Canteens",
    "LKC",
    "Gym",
    "Hallway",
    "Parking Lot",
    "Lobby",
    "Lift Area",
    "Toilet",
    "Other",
  ];

  const categoryOptions = [
    "Electronics",
    "Stationery",
    "Accessories",
    "Documents",
    "Clothing",
    "Others",
  ];

  const colorOptions = [
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
    "Grey",
  ];


  const handleText = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };


  const handleColorToggle = (color) => {
    setForm((prev) => {
      const exists = prev.color.includes(color);
      return {
        ...prev,
        color: exists ? prev.color.filter((c) => c !== color) : [...prev.color, color],
      };
    });
  };

  const revertChanges = () => {
    setForm(original);
  };

  // Temporary/local-only save (until Supabase wiring)
  // const handleSave = () => {
  //   // In the future:
  //   // - call update API using item.id
  //   // - upload image if changed
  //   // - maybe show success toast
  //   setOriginal(form);
  //   onClose?.();
  // };

  const [imgFile, setImgFile] = useState(null);

  const onImageSelected = (e) => {
    const file = e.target.files?.[0];

    console.log("Selected file:", file);
    if (!file) return;

    // added setImgFile to save the public URL like in the Profile.jsx
    setImgFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const fileInputRef = useRef(null);

  return (
    <div className="item-modal-overlay" onClick={onClose}>
      <div className="item-modal" onClick={(e) => e.stopPropagation()}>
        <div className="item-modal-header">
          <h1>Edit Item Details</h1>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="item-edit-top">
          <div className="item-edit-image">
            <div className="item-image-box">
              <img 
                src={form.image || imageIcon} 
                alt={form.title || "item"} 
                className={`item-image ${!form.image ? "placeholder-image" : ""}`} 
              />

                <Button
                  type="uploadImage"
                  iconOnly
                  icon={uploadIcon}
                  onClick={() => fileInputRef.current?.click()}
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onImageSelected}
                  className="upload-input"
                />
            </div>
          </div>


          <div className="item-edit-grid">
            <div className="edit-field">
              <label>Item Name</label>
              <input value={form.title} onChange={handleText("title")} type="text" />
            </div>

            {/* currently there is no personName column inside the supabase */}
            {/* <div className="edit-field">
              <label>Owner Name</label>
              <input value={form.owner} onChange={handleText("founder")} type="text" />
            </div> */}

            <div className="edit-field">
              <label>Date Lost</label>
              <input value={form.date} onChange={handleText("date")} type="text" placeholder="dd/mm/yyyy" />
            </div>

            <div className="edit-field">
              <label>Campus</label>
              <select value={form.campus} onChange={handleText("campus")}>
                <option value="">Select campus</option>
                {campusOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-field">
              <label>Location</label>
              <select value={form.location} onChange={handleText("location")}>
                <option value="">Select location</option>
                {locationOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-field">
              <label>Floor</label>
                <input
                  value={form.floor}
                  onChange={handleText("floor")}
                  type="text"
                  placeholder="Example: 2"
                />
            </div>

            <div className="edit-field">
              <label>Category</label>
              <select value={form.category} onChange={handleText("category")}>
                <option value="">Select category</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-field" style={{ gridColumn: "1 / -1" }}>
              <label>Color</label>

              <div className="color-checkbox-group">
                {colorOptions.map((color) => (
                  <label key={color} className="color-checkbox">
                    <input
                      type="checkbox"
                      checked={form.color.includes(color)}
                      onChange={() => handleColorToggle(color)}
                    />
                    {color}
                  </label>
                ))}
              </div>

            </div>

          </div>
        </div>

        <div className="item-edit-bottom">
          <div className="detail-edit-box">
            <label>Item Description</label>
            <textarea value={form.description} onChange={handleText("description")} />
          </div>

          <div className="detail-edit-box">
            <label>Location Description</label>
            <textarea
              value={form.locationDescription}
              onChange={handleText("locationDescription")}
            />
          </div>
        </div>

        <div className="item-edit-actions">
          <Button 
            type="revertEdit"
            label="Revert"
            onClick={revertChanges}
            className=""
          />
          <Button 
            type="saveEdit" 
            label="Save"
            onClick={handleSave}
            className=""
          />
        </div>

      </div>
    </div>
  );
};

export default ModalItemDetailsStudentEdit;

