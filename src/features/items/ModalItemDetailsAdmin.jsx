// can be accessed using bt_

// consists of (can be editted)
// - item name
// - upload image (use img_button.jsx)
// - founder's name
// - date lost
// - location
// - campus
// - category
// - item color
// - floor
// - item description
// - location description

// also have that the student popup doesn't
// - status (claimed / unclaimed)
// - reciever name
// - reciever id
// - phone
// - date


import React, { useState, useEffect } from "react";
import "./ModalItemDetailsStudentView.css";
import Dropdown from "../../components/Dropdown";
import DropdownRadio from "../../components/DropdownRadio";

const ModalItemDetailsAdmin = ({ item, onClose }) => {
    const [items, setItems] = useState({});
    const [isClaimed, setClaimed] = useState("Unclaimed");


    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        setItems(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (e) => {
        console.log(items, isClaimed)
    }
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-item-details" onClick={(e) => e.stopPropagation()}>

                {/* ⨉ Close Button */}
                <button className="modal-close" onClick={onClose}>
                    ⨉
                </button>

                <table>
                    <tbody>
                        <tr>
                            <td rowSpan={3}>
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="modal-item-img"
                                />

                            </td>
                            <td>
                                <strong>Item Name</strong>
                                <p>{item.title}</p>
                            </td>
                            <td colSpan={2}>
                                <strong>Founder's Name</strong>
                                <p>{item.founder}</p>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <strong>Date Lost </strong>
                                <p>{item.date.slice(0, 10)}</p>
                            </td>

                            <td>
                                <strong>Campus</strong>
                                <p>{item.campus}</p>
                            </td>
                            <td>
                                <strong>Location</strong>
                                <p>{item.location}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Category</strong>
                                <p>{item.category}</p>
                            </td>

                            <td>
                                <strong>Color:</strong>{" "}
                                <p>{item.color.join(", ")}</p>

                            </td>
                            <td>
                                <strong>Floor</strong>
                                <p>{item.floor}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <strong>
                                    Description
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <strong>Item Description</strong>
                                <p>{item.description}</p>
                            </td>

                            <td colSpan={2}>
                                <strong>Location Description:</strong><br />
                                <p>{item.locationDescription}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>




                {/* Content */}
                <div className="modal-item-content">
                    {/* <h2>{item.title}</h2>

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
                    </p> */}

                    <div className="modal-admin-editbox">
                        <p>Status</p>
                        <Dropdown label={isClaimed} type="isClaimed">
                            <DropdownRadio
                                name="isClaimed"
                                options={[
                                    "Unclaimed",
                                    "Claimed"
                                ]}
                                selected={isClaimed}
                                setSelected={setClaimed}
                            />
                        </Dropdown>

                        <form>
                            <label>
                                Name
                                <input
                                    type="text"
                                    name="claimerName"
                                    value={items.claimerName}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Phone
                                <input
                                    type="text"
                                    name="phone"
                                    value={items.phone}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                NIM
                                <input
                                    type="text"
                                    name="nim"
                                    value={items.nim}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Date
                                <input
                                    type="text"
                                    name="founddate"
                                    value={items.founddate}
                                    onChange={handleChange}
                                />
                            </label>
                        </form>
                        <button className="btn btn-post" onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ModalItemDetailsAdmin;