import "./ModalSignUp.css";
import React, {useState} from "react";

const ModalSignUp = ({onClose}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignUp = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email || !password || !confirmPassword) {
            setError("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            // BACKEND API LATER
            // await axios.post("/api/register", {
            //     email,
            //     password
            // });

            console.log({
                email,
                password
            });

            setSuccess("Account created successfully.");

        } catch (err) {
            console.error(err);
            setError("Account creation failed.");

        } finally {
            setLoading(false);
        }
    };
    
    return (

        <div className="modal-overlay" onClick={onClose}>

            <div className="modal-container"onClick={(e) => e.stopPropagation()}>

                <div className="modal-header">

                    <button className="modal-close" onClick={onClose}>
                        ⨉
                    </button>

                    <h2>Create New Account</h2>

                </div>

                <form className="modal-content" onSubmit={handleSignUp}>

                    <h3>Email</h3>

                    <input
                        className="input-field"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="divider"></div>

                    <h3>Create Password</h3>

                    <input
                        className="input-field"
                        type="password"
                        placeholder="Create your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <h3>Confirm Password</h3>

                    <input
                        className="input-field"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        className="create-account-button"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Account"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ModalSignUp;