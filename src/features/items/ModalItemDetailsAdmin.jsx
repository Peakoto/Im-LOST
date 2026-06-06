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
import {supabase} from "../../data/supabase";

const ModalItemDetailsAdmin = ({ item, onClose,viewLostReports }) => {

    const [owner, setOwner] = useState({});
    const [isClaimed, setClaimed] = useState("Unclaimed");
    const[foundId,setFoundId] = useState (null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(()=>{
        const getFoundId =  async()=>{
            if (!item?.id) return

            const {data,error}= await supabase
                .from("FoundReport")
                .select("found_id")
                .eq("item_id", item.id)
                .single()
            
            if (error){
                console.error("Error getting found_id:", error)
                return
            }
            console.log("Found ID:", data.found_id)
            setFoundId(data.found_id)
        }

        getFoundId()
    },[item])

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
        setOwner(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        
        if (isClaimed !== "Claimed"){
            setError("Please change status to 'Claimed' before saving.")
            return
        }
        if (!owner.claimerName||!owner.phone||!owner.nim||!owner.dateClaimed){
            setError("Please fill all fields!")
            return
        }
        
        if (!foundId) {
            setError("Could not find the found report for this item.")
            return
        }

        try{
            setLoading(true)

            //checks if the claim has been made before
            const { data: claimExist, error: checkError } = await supabase
            .from("Claim")
            .select("found_id")
            .eq("found_id", foundId)
            .single()

            if (claimExist) {
                setError("This item has already been claimed.")
                return
            }
            const{error:claimError}= await supabase
                .from("Claim")
                .insert([{
                    found_id: foundId,
                    name_claimed: owner.claimerName,
                    phone_claimed: owner.phone,
                    nim_claimed: owner.nim,
                    date_claimed: owner.dateClaimed,
                    status: isClaimed,
                }])
            
            if (claimError) throw claimError

            setSuccess("Claim submitted successfully!")
        }catch(e){
            console.error(error)
            setError(err.message|| "Save failed")
        }finally{
            setLoading(false)
        }
    }

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
                            <p>{item.color.join(", ")}</p>
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
                
                {viewLostReports === "Lost Reports"?null:(
                    <>
                    <div className="item-admin-top">
                        <div><p>Status</p></div>
                        <div>
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
                        </div>
                    </div>
                {/* BOTTOM SECTION */}

                    <div className="item-admin-contents">

                        <div>
                            <form>
                                <label>Name
                                    <input
                                        type="text"
                                        name="claimerName"
                                        value={owner.claimerName||""}
                                        onChange={handleChange}
                                    />
                                </label>
                            </form>
                        </div>
                        <div>
                            <label>
                                Phone
                                <input
                                    type="text"
                                    name="phone"
                                    value={owner.phone||""}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                NIM
                                <input
                                    type="text"
                                    name="nim"
                                    value={owner.nim||""}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Date
                                <input type="date" name="dateClaimed" value={owner.dateClaimed||""} onChange={handleChange}/>
                            </label>
                        </div>
                    </div>
                    <div className="item-admin-bottom">
                        <div>
                            {error && <p className="error-text">{error}</p>}
                            {success && <p className="success-text">{success}</p>}  
                        </div>
                        
                        <button 
                            className="btn btn-post" 
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading?"Saving..":"Save"}
                        </button>
                        
                    </div>
                </>
                )}

                


            </div>

        </div>
    );
}

export default ModalItemDetailsAdmin;