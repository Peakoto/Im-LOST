import React, { useEffect, useMemo, useState } from "react";
import "./ModalItemDetailsStudentEdit.css";
import Button from "../../components/Button.jsx";
import uploadIcon from "../../assets/upload_icon.png";

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


// Edit modal (normalized field names to match ModalItemDetailsStudentView)
// Expected `item` shape:
// - image
// - title
// - founder
// - date
// - location
// - campus
// - category
// - color (string[] or string)
// - description
// - locationDescription

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
    };
  }, [item]);

  const [form, setForm] = useState(initial);
  const [original, setOriginal] = useState(initial);

  useEffect(() => {
    setForm(initial);
    setOriginal(initial);
  }, [initial]);

  if (!item) return null;

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
  const handleSave = () => {
    // In the future:
    // - call update API using item.id
    // - upload image if changed
    // - maybe show success toast
    setOriginal(form);
    onClose?.();
  };

  const onImageSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

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
              <img src={form.image || ""} alt={form.title || "item"} className="item-image" />

              <label className="upload-label" aria-label="Upload image">
                <Button
                  type="uploadImage"
                  iconOnly={true}
                  icon={uploadIcon}
                  onClick={() => {}}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageSelected}
                  className="upload-input"
                />
              </label>
            </div>
          </div>


          <div className="item-edit-grid">
            <div className="edit-field">
              <label>Item Name</label>
              <input value={form.title} onChange={handleText("title")} type="text" />
            </div>

            <div className="edit-field">
              <label>Founder</label>
              <input value={form.founder} onChange={handleText("founder")} type="text" />
            </div>

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
              <select
                value={form.color[0] ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setForm((prev) => ({ ...prev, color: v ? [v] : [] }));
                }}
              >
                <option value="">Select color</option>
                {colorOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        <div className="item-edit-bottom">
          <div className="detail-edit-box">
            <label>Description</label>
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

