import React from "react";
import "./ItemCard.css";

const ItemCard = ({ item }) => {
    return (
        <div className="item-card">
            <img src={item.image} alt={item.title} className="item-image" />

            <div className="item-content">
                <h3 className="item-title">{item.title}</h3>
                <div className="item-subcontent">
                    <p className="item-subcontent-title">Date Found</p>
                    <p className="item-date">{item.date}</p>

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