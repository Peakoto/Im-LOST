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

    const [historyData, setHistoryData] = useState(placeholderHistory);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [historyError, setHistoryError] = useState(null);

    useEffect(()=>{
        const LoadProfile = async()=>{
            setLoading(true)
            setError("")

            try{

            }catch (e){

            }finally{
                setLoading(false)
                setLoadingHistory(f)
            }
        }
    })
    useEffect(() => {
        let isMounted = true;

        async function loadHistory() {
            setLoadingHistory(true);
            setHistoryError(null);

            try {
                const { user } = await getCurrentUser();

                // Keep placeholder history if auth isn't ready / no user.
                if (!user?.id) return;
                // feel free to remove after wiring

                const history = await fetchHistoryByUserId(user.id);
                if (!isMounted) return;
                setHistoryData(history);

                // Load profile fields once available in your DB schema.
                const profile = await fetchProfileByUserId(user.id);
                if (!isMounted) return;
                setUserData(profile);
            } catch (e) {
                if (!isMounted) return;
                setHistoryError(e?.message || "Failed to load history");
            } finally {
                if (isMounted) setLoadingHistory(false);
            }
        }

        loadHistory();

        return () => {
            isMounted = false;
        };
    }, []);



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
                            readOnly
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
                            readOnly
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

                {/* BUTTON SECTION */}
                <div className="profile-buttons">
                    <Button
                        type="profile"
                        label="Change Password"
                        onClick={() => setShowPasswordModal(true)}
                    />
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