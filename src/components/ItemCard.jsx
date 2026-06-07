import React from "react";
import "./ItemCard.css";
import imageIcon from "../assets/image_icon.png";

const ItemCard = ({ item, onClick }) => {
    return (
        <div className="item-card" onClick={() => onClick(item)}>
            <img
                src={item.image || imageIcon}
                alt={item.title}
                className={`item-image ${!item.image ? "placeholder-image" : ""}`}
            />

            <div className="item-content">
                <h3 className="item-title">{item.title}</h3>
                <div className="item-subcontent">
                    <p className="item-subcontent-title">Date Found</p>
                    <p className="item-date">{new Date(item.dateFound).toLocaleDateString()}</p>

                    <p className="item-subcontent-title">Location</p>
                    <p className="item-location">{item.location}</p>

                    <p className="item-subcontent-title">Category</p>
                    <p className="item-category">{item.category}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;