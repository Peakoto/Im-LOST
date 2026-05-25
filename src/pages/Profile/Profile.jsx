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
import { useState } from "react";
import Button from "../../components/Button.jsx";
import ModalPassChange from "../../features/auth/ModalPassChange.jsx";
import ModalHistory from "../../features/history/ModalHistory.jsx";
import profileIcon from "../../assets/home_button.png";

function Profile() {

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const userData = {
        name: "John Jeans",
        email: "john@gmail.com",
        phone: "0811111111",
    };

    const historyData = [
      {
        id: 1,
        status: "Found",
        dateLost: "10/01/2014",
        itemName: "Notebook A4",
        campus: "Alam Sutera",
        location: "B0501",
      },
    ];

    return (
        <div className="profile">

            {/* TITLE */}
            <div className="top">
                <img src={profileIcon} alt="profile icon" /> 
                <h1>Profile</h1>
            </div>

            {/* PROFILE CARD */}
            <div className="profile-card">

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
                        type="secondary"
                        label="Change Password"
                        onClick={() => setShowPasswordModal(true)}
                    />

                    <Button
                        type="primary"
                        label="Save"
                    />

                </div>

            </div>

            {/* HISTORY */}
            <ModalHistory historyData={historyData} />

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