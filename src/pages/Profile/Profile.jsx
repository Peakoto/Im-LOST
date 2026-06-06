/*
  Components: 
  - Profile Card
    - name
    - email
    - phone number
    - password (hidden)
    - change password button
    - save button
  - Lost Item History Table
    - Linked to Supabase
    - item number from top
    - status (lost/found)
    - date lost
    - item name
    - Campus found
    - location found
    - info button redirect to item details page
    - edit button redirect to edit item page
*/

import "./Profile.css";
import { useEffect, useState } from "react";
import { fetchHistoryByUserId, getCurrentUser, fetchProfileByUserId } from "../../api/profileApi.js";
import Button from "../../components/Button.jsx";
import ModalPassChange from "../../features/auth/ModalPassChange.jsx";
import ModalHistory from "../../features/history/ModalHistory.jsx";
import homeIcon from "../../assets/home_icon.png";
import { supabase } from "../../data/supabase.js";

function Profile() {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const[saving, setSaving] = useState(false);
    const[error,setError]= useState("");
    const [success,setSuccess] =useState("");

    // placeholder data
    const [userData, setUserData] = useState({
        name: "Name",
        email: "Email",
        phone: "Phone",
    });

    // can also just make useState(null) after done wiring up

    // const placeholderHistory = [
    //   {
    //     id: 1,
    //     status: "Lost",
    //     dateLost: "10/01/2014",
    //     itemName: "Notebook A5",
    //     campus: "Alam Sutera",
    //     location: "LKC",
    //     image: "",
    //     founder: "Anonymous",
    //     category: "Documents",
    //     color: ["White"],
    //     description: "A notebook that was turned in in good condition.",
    //     locationDescription: "Found in the LKC room (Binus Alam Sutera).",

    //   },
    // ];

    /*
    once everything is wired up, remove the const placeholderHistory and useState placeholder History into this: 
    const [historyData, setHistoryData] = useState([])
    */

    const [historyData, setHistoryData] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [historyError, setHistoryError] = useState(null);

    useEffect(()=>{
        const loadProfile = async()=>{
            setLoading(true)
            setError("")

            try{
                // get logged in suser form auth
                const {data: {user},error:authError} = await supabase.auth.getUser()

                if (authError ||!user){
                    setError("User is not Logged in, Please Log in First")
                    return
                }

                //get user data from supabase
                const {data, error:profileError} = await supabase
                    .from("User")
                    .select ("*")
                    .eq("user_id",user.id)
                    .single()
                
                if (profileError){
                    setError("Failed to load profile, after supabase")
                    return
                }

                setUserData({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                })

                //GET lost report history 
                setLoadingHistory(true)
                const {data: historyItems, error:historyError} = await supabase
                    .from ("LostReport")
                    .select("*,Item(*)")
                    .eq("user_id",user.id)
                
                if (historyError){
                    setError("Failed to load History")
                }else{
                    // map the items to the ModalHistory.jsx
                    setHistoryData((historyItems || []).map(report => ({
                        id: report.lost_id,

                        lost_id: report.lost_id,
                        item_id: report.item_id,

                        // temp since further connection with the match table is needed (ModalItemDetailsAdmin.jsx)
                        status: "Lost",
                        
                        dateLost: report.date_lost,
                        itemName: report.Item?.item_name || "",
                        campus: report.Item?.campus_location || "",
                        location: report.Item?.location || "",
                        floor: report.Item?.floor || "",
                        color: report.Item?.item_color || "",
                        locationDescription: report.Item?.location_description || "",
                        itemDescription: report.Item?.item_description || "",
                        category: report.Item?.item_category || "",
                        imageURL: report.Item?.imageURL || "",
                        created_at: report.Item?.created_at || ""
                        })));
                }

            }catch (e){
                setError(e.message|| "Failed to load Profile")
            }finally{
                setLoading(false)
                setLoadingHistory(false)
            }
        }

        loadProfile()
    },[])

    const handleSave = async ()=>{
        setSaving(true)
        setError("")
        setSuccess("")

        try{
            const {data:{user}}= await supabase.auth.getUser()
            const {error:updateError} = await supabase
                .from("User")
                .update({
                    name: userData.name,
                    phone : userData.phone,
                })
                .eq("user_id",user.id)
        
            if (updateError) throw updateError
            setSuccess("Profile saved successfully!")
        }catch(e){
            setError(e.message || "Failed to save profile.")
        }finally{
            setSaving(false)
        }
    }

    if(loading) return <div>Loading Profile ...</div>

    return (
        <div className="profile">

            {/* TITLE */}
            <div className="top">
                <div className="home-btn-wrap">
                    <Button
                    type="home"
                    icon={homeIcon}
                    to="/"
                    iconOnly={true}
                    />
                </div>
                
            </div>

            {/* PROFILE CARD */}
            <div className="profile-card">
                <h1>Profile</h1>

                <div className="profile-grid">

                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={userData.email}
                            readOnly
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value="password"
                            readOnly
                        />
                    </div>

                </div>

                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}

                {/* BUTTON SECTION */}
                <div className="profile-buttons">
                    <div className="ChangePass-btn">
                        <Button
                            type="profile"
                            label="Change Password"
                            onClick={() => setShowPasswordModal(true)}
                        />  
                    </div>
                    <div className="save-btn">
                        <Button
                            type="profile"
                            label={saving? "Saving":"Save"}
                            onClick={handleSave}
                        />
                        
                    </div>
                </div>

            </div>

            {/* HISTORY */}
            {loadingHistory ? (
                <div className="history-loading">Loading history...</div>
            ) : historyError ? (
                <div className="history-error">{historyError}</div>
            ) : (
                <ModalHistory historyData={historyData} />
            )}

            {/* PASSWORD MODAL */}
            {
                showPasswordModal &&
                <ModalPassChange
                    onClose={() => setShowPasswordModal(false)}
                />
            }

        </div>
    );
}

export default Profile;