// consists of
// - email textbox
// - password textbox
// - remember me checkbox
// - forgot your password directory
// - login button
// - continue with microsoft button
// - continue with google button

import "./ModalLogin.css";
import React, {useState} from "react";
import microsoft from "../../assets/microsoft_icon.png";
import google from "../../assets/google_icon.png";
import ModalPassChange from "./ModalPassChange.jsx";
import ModalSignUp from "./ModalSignUp.jsx";

const ModalLogin = ({item, onClose}) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please fill all fields.");
            return;
        }

        try {
            setLoading(true);

            // BACKEND API CALL LATER
            // await axios.post("/api/login", {
            //     email,
            //     password,
            //     rememberMe
            // });

            console.log({
                email,
                password,
                rememberMe
            });

        } catch (err) {
            setError("Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-container" onClick={(e) => e.stopPropagation()}>

                    <div className="modal-header">
                        <button className="modal-close" onClick={onClose}>
                            ⨉
                        </button>

                        <h2>Log In</h2>
                    </div>
                    
                    <form className="modal-content" onSubmit={handleLogin}>
                        <h3>Email</h3>
                        <input
                            className="input-field"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <h3>Password</h3>
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="remember-forgot">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text">Remember me</span>
                            </label>

                            <button className="forgot-password" onClick={() => setShowForgotPassword(true)}>Forgot Your Password?</button>
                        </div>
                        
                        <button type="submit" className="login-button">
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                        

                        <h4>Don't have an account? <a href="#" className="sign-up-link" onClick={() => setShowSignUp(true)}>Sign Up</a></h4> 

                        {/* <div className="divider">
                            <span>or</span>
                        </div> */}

                        {/* for now won't be functionable yet */}
                        {/* <button className="login-continue">
                            <img src={microsoft} alt="Microsoft" />
                            <span>Continue with Microsoft</span>
                        </button>
                        
                        <button className="login-continue">
                            <img src={google} alt="Google" />
                            <span>Continue with Google</span>
                        </button> */}

                    </form>
                </div>
            </div>
            {showForgotPassword && (
                <ModalPassChange
                    onClose={() => setShowForgotPassword(false)}
                />
            )}
            {showSignUp && (
                <ModalSignUp
                    onClose={() => setShowSignUp(false)}
                />
            )}

            {error && <p className="error-text">{error}</p>}
        </>
    );
};

export default ModalLogin;
