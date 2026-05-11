// can be accessed through 'bt_pass_change.jsx'
// consists of 
// - old password
// - new password
// - confirm new password
// - save button

import React, {useState} from 'react'
import './ModalPassChange.css'

const ModalPassChange = ({onClose}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (
            !oldPassword ||
            !newPassword ||
            !confirmNewPassword
        ) {
            return;
        }

        if (newPassword !== confirmNewPassword) {
            return;
        }

        try {

            setLoading(true);

            // BACKEND API LATER
            // await axios.put("/api/change-password", {
            //     oldPassword,
            //     newPassword
            // });

            console.log({
                oldPassword,
                newPassword
            });

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