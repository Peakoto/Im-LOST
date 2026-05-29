// can be accessed through 'bt_pass_change.jsx'
// consists of 
// - old password
// - new password
// - confirm new password
// - save button

import React, {useState} from 'react';
import './ModalPassChange.css';
import {supabase} from "../../data/supabase";

const ModalPassChange = ({onClose}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (!oldPassword ||!newPassword ||!confirmNewPassword) {
            setError("Please fill all fields!");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match.")
            return;
        }

        if (newPassword.length<6){
            setError("New Password has to be at least 6 characters.");
            return;
        }
        try {
            setLoading(true);

            //authenticate old password
            const{data: {user}}= await supabase.auth.getUser()

            const{error:signInError} = await supabase.auth.signInWithPassword({
                email: user.email,
                password: oldPassword,
            })
            
            if (signInError){
                setError("Old Password is incorrect.");
                return;
            }

            //update new password
            const{error:updateError}= await supabase.auth.updateUser({
                password:newPassword
            })

            if (updateError){
                setError("Failed to update password.");
                console.log("Error:",updateError);
                return;
            }
            setSuccess("Password changed successfully.");

        } catch (err) {

            console.error(err);
            setError("Failed to change password.");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>

            <div className="modal-container" onClick={(e) => e.stopPropagation()}>

                <div className="modal-header">

                    <button className="modal-close" onClick={onClose}>
                        ⨉
                    </button>

                    <h2>Change Password</h2>

                </div>

                <form className="modal-content" onSubmit={handlePasswordChange}>

                    <h3>Old Password</h3>

                    <input
                        className="input-field"
                        type="password"
                        placeholder="Enter your old password"
                        value={oldPassword}
                        onChange={(e) =>
                            setOldPassword(e.target.value)
                        }
                    />

                    <div className="divider"></div>

                    <h3>New Password</h3>

                    <input
                        className="input-field"
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                    />

                    <h3>Confirm New Password</h3>

                    <input
                        className="input-field"
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmNewPassword}
                        onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                        }
                    />

                    {error && (
                        <p className="error-text">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="success-text">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="save-button"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default ModalPassChange