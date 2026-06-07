import React from "react";
import "./ModalItemDetailsStudentView.css";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import matchIcon from "../../assets/match_icon.png";
import imageIcon from "../../assets/image_icon.png";

const ModalItemDetailsStudentView = ({ item, onClose, isAdmin=false }) => {
    const safeColor = Array.isArray(item?.color)
        ? item.color
        : item?.color
            ? [item.color]
            : [];
    // to prevent the modal from crashing when item.color is not exactly the type the jsx assumes.
    // guarantees safeColor is always either an array of colors, array with color strings, or empty array. (so join is always safe)

    const title = item?.title ?? item?.itemName ?? "";
    const founder = item?.founder ?? item?.founderName ?? "";
    const date = item?.date ?? item?.dateFound ?? "";
    const location = item?.location ?? item?.locationFound ?? item?.locationDetails ?? "";
    const locationDescription = item?.locationDescription ?? item?.locationDetails ?? "";

    const navigate = useNavigate();

    // if the expected field name isnt present, try the alternate one
    console.log("ModalItemDetailsStudentView isAdmin:", isAdmin);

    console.log("Modal mounted");
    console.log("isAdmin:", isAdmin);
    return (
        <div className="item-modal-overlay" onClick={onClose}>

            <div className="item-modal" onClick={(e) => e.stopPropagation()}>


                {/* HEADER */}
                <div className="item-modal-header">

                    <h1>Item Details</h1>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                {/* TOP SECTION */}
                <div className="item-detail-top">

                    {/* IMAGE */}
                    <div className="item-image-container">

                        <img
                            src={item.image || imageIcon}
                            alt={item.itemName}
                            className={`item-image ${!item.image ? "placeholder-image" : ""}`}
                        />

                    </div>

                    {/* INFORMATION */}
                    <div className="item-info-grid">

                        <div>
                            <label>Item Name</label>
                            <p>{item.title}</p>
                        </div>

                        {/* <div>
                            <label>Founder's Name</label>
                            <p>{item.founder}</p>
                        </div> */}

                        <div>
                            <label>Date Found</label>
                            <p>{item.date}</p>
                        </div>

                        <div>
                            <label>Campus</label>
                            <p>{item.campus}</p>
                        </div>

                        <div>
                            <label>Location</label>
                            <p>{item.location}</p>
                        </div>

                        <div>
                            <label>Category</label>
                            <p>{item.category}</p>
                        </div>

                        <div>
                            <label>Item Color</label>
                            <p>{item.color.join(", ")}</p>
                        </div>

                        <div>
                            <label>Floor</label>
                            <p>{item.floor}</p>
                        </div>

                    </div>

                </div>

                {/* BOTTOM SECTION */}
                <div className="item-detail-bottom">

                    <div className="detail-box">

                        <label>Item Description</label>

                        <p>{item.description}</p>

                    </div>

                    <div className="detail-box">

                        <label>Location Description</label>

                        <p>{item.locationDescription}</p>

                    </div>

                </div>

                {isAdmin && (
                    <Button
                        type="matchPage"
                        label="Match Item"
                        icon={matchIcon}
                        onClick={() => {
                            navigate(`/match/${item.item_id}`, {
                                state: {item}
                            });
                        }}
                    />
                )}

            </div>

        </div>
    );
}

export default ModalItemDetailsStudentView;