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

import React, { useEffect, useState } from "react";
import "./ModalItemDetailsStudentView.css";
import Dropdown from "../../components/Dropdown";
import DropdownRadio from "../../components/DropdownRadio";

const ModalItemDetailsAdmin = ({ item, onClose }) => {

    const [dave, setDave] = useState({});
    const [isClaimed, setClaimed] = useState("Unclaimed");

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

    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        setDave(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (e) => {
        console.log(dave, isClaimed)
    }
    // if the expected field name isnt present, try the alternate one

    return (
        <div className="item-modal-overlay" onClick={onClose}>

            <div className="item-modal" onClick={(e) => e.stopPropagation()}>


                {/* HEADER */}
                <div className="item-modal-header">

                    <h1>Item Details A</h1>

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
                            src={item.image}
                            alt={item.itemName}
                            className="item-image"
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
                            <p>{item.color}</p>
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
                {/* ADMIN SECTION */}
                
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
                                value={dave.claimerName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Phone
                            <input
                                type="text"
                                name="phone"
                                value={dave.phone}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            NIM
                            <input
                                type="text"
                                name="nim"
                                value={dave.nim}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Date
                            <input
                                type="text"
                                name="founddate"
                                value={dave.founddate}
                                onChange={handleChange}
                            />
                        </label>
                    </form>
                    <button className="btn btn-post" onClick={handleSubmit}>Submit</button>
                </div>

            </div>

        </div>
    );
}

export default ModalItemDetailsAdmin;

// import Dropdown from "../../components/Dropdown";
// import DropdownRadio from "../../components/DropdownRadio";

// const ModalItemDetailsAdmin = ({ item, onClose }) => {
//     const [items, setItems] = useState({});
//     const [isClaimed, setClaimed] = useState("Unclaimed");


//     const handleChange = (e) => {
//         e.preventDefault()
//         const name = e.target.name;
//         const value = e.target.value;
//         setItems(values => ({ ...values, [name]: value }))
//     }

//     const handleSubmit = async (e) => {
//         console.log(items, isClaimed)
//     }
//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-item-details" onClick={(e) => e.stopPropagation()}>

//                 {/* ⨉ Close Button */}
//                 <button className="modal-close" onClick={onClose}>
//                     ⨉
//                 </button>

//                 <table>
//                     <tbody>
//                         <tr>
//                             <td rowSpan={3}>
//                                 {/* Image */}
//                                 <img
//                                     src={item.image}
//                                     alt={item.title}
//                                     className="modal-item-img"
//                                 />

//                             </td>
//                             <td>
//                                 <strong>Item Name</strong>
//                                 <p>{item.title}</p>
//                             </td>
//                             <td colSpan={2}>
//                                 <strong>Founder's Name</strong>
//                                 <p>{item.founder}</p>
//                             </td>

//                         </tr>
//                         <tr>
//                             <td>
//                                 <strong>Date Lost </strong>
//                                 <p>{item.date.slice(0, 10)}</p>
//                             </td>

//                             <td>
//                                 <strong>Campus</strong>
//                                 <p>{item.campus}</p>
//                             </td>
//                             <td>
//                                 <strong>Location</strong>
//                                 <p>{item.location}</p>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <strong>Category</strong>
//                                 <p>{item.category}</p>
//                             </td>

//                             <td>
//                                 <strong>Color:</strong>{" "}
//                                 <p>{item.color.join(", ")}</p>

//                             </td>
//                             <td>
//                                 <strong>Floor</strong>
//                                 <p>{item.floor}</p>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td colSpan={4}>
//                                 <strong>
//                                     Description
//                                 </strong>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td colSpan={2}>
//                                 <strong>Item Description</strong>
//                                 <p>{item.description}</p>
//                             </td>

//                             <td colSpan={2}>
//                                 <strong>Location Description:</strong><br />
//                                 <p>{item.locationDescription}</p>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>




//                 {/* Content */}
//                 <div className="modal-item-content">


//                     <div className="modal-admin-editbox">
//                         <p>Status</p>
//                         <Dropdown label={isClaimed} type="isClaimed">
//                             <DropdownRadio
//                                 name="isClaimed"
//                                 options={[
//                                     "Unclaimed",
//                                     "Claimed"
//                                 ]}
//                                 selected={isClaimed}
//                                 setSelected={setClaimed}
//                             />
//                         </Dropdown>

//                         <form>
//                             <label>
//                                 Name
//                                 <input
//                                     type="text"
//                                     name="claimerName"
//                                     value={items.claimerName}
//                                     onChange={handleChange}
//                                 />
//                             </label>
//                             <label>
//                                 Phone
//                                 <input
//                                     type="text"
//                                     name="phone"
//                                     value={items.phone}
//                                     onChange={handleChange}
//                                 />
//                             </label>
//                             <label>
//                                 NIM
//                                 <input
//                                     type="text"
//                                     name="nim"
//                                     value={items.nim}
//                                     onChange={handleChange}
//                                 />
//                             </label>
//                             <label>
//                                 Date
//                                 <input
//                                     type="text"
//                                     name="founddate"
//                                     value={items.founddate}
//                                     onChange={handleChange}
//                                 />
//                             </label>
//                         </form>
//                         <button className="btn btn-post" onClick={handleSubmit}>Submit</button>
//                     </div>

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default ModalItemDetailsAdmin;
