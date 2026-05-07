// can be accessed through information button inside history.jsx
// or from item preview in main page 'main.jsx'

// consists of (view only)
// - item name
// - founder's name
// - date lost
// - location
// - campus
// - category
// - item color
// - floor
// - item description
// - location description

import React from "react";
import "./ModalItemDetailsStudentView.css";

const ModalItemDetailsStudentView = ({item, onClose}) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-item-details" onClick={(e) => e.stopPropagation()}>

                {/* ⨉ Close Button */}
                <button className="modal-close" onClick={onClose}>
                    ⨉
                </button>

                {/* Image */}
                <img 
                    src={item.image} 
                    alt={item.title}
                    className="modal-item-img" 
                />

                {/* Content */}
                <div className="modal-item-content">
                    <h2>{item.title}</h2>

                    <p><strong>Founder: </strong> {item.founder}</p>
                    <p><strong>Date Found: </strong> {item.date}</p>
                    <p><strong>Location: </strong> {item.location}</p>
                    <p><strong>Campus: </strong> {item.campus}</p>
                    <p><strong>Category: </strong> {item.category}</p>

                    <p>
                        <strong>Color:</strong>{" "}
                        {item.color.join(", ")}
                    </p>

                    <p>
                        <strong>Floor:</strong>{" "}
                        {item.floor}
                    </p>

                    <p>
                        <strong>Item Description:</strong><br />
                        {item.description}
                    </p>
                    <p>
                        <strong>Location Description:</strong><br />
                        {item.locationDescription}
                    </p>

                </div>
            </div>

        </div>
    )
}

export default ModalItemDetailsStudentView;