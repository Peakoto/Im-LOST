// consists of
// - email textbox
// - password textbox
// - remember me checkbox
// - forgot your password directory
// - login button
// - continue with microsoft button
// - continue with google button

import "./ModalLogin.css";
import React, {useEffect, useState} from "react";
import microsoft from "../../assets/microsoft_icon.png";
import google from "../../assets/google_icon.png";
import ModalPassChange from "./ModalPassChange.jsx";
import ModalSignUp from "./ModalSignUp.jsx";
import {supabase} from "../../data/supabase";

const ModalLogin = ({item, onClose,isLoggedIn,setIsLoggedIn,setCurrentUser}) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
        const remembered= localStorage.getItem("rememberMe")
        const savedEmail= localStorage.getItem("email")

        if (remembered=="true" && savedEmail){
            setEmail(savedEmail)
            setRememberMe(true)
        }
    },[])

    const handleLogout = async(e)=>{
        e.stopPropagation()


        try {

            const { error } = await supabase.auth.signOut();

            if (error) throw error;


            setIsLoggedIn(false);
            setCurrentUser(null);

            onClose();

            console.log("Modal closed");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill all fields.");
            return;
        }
        try {            
            setLoading(true);

            // Check if user exists in User table
            const { data: Userdata, error: userError } = await supabase
                .from("User")
                .select("*")
                .eq("email", email)
                .single()

            if (userError || !Userdata) {
                setError("Account does not exist");
                return;
            }

            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email, password,
            });

            console.log("authError:", authError)
            console.log("data:", data)

            if (authError) {
                setError("Invalid email or password!");
                return; 
            }

            // Remember Me
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true")
                localStorage.setItem("email", email)
            } else {
                localStorage.removeItem("rememberMe")
                localStorage.removeItem("email")
            }

            console.log("Logged in user:", Userdata);
            setIsLoggedIn(true)

            // also changed here to try to fix supabase problem
            // setCurrentUser(Userdata)
            
            onClose();
        } catch (err) {
            setError("Login failed.");
        } finally {
            setLoading(false);
        }
    };

    if(isLoggedIn){

    }
    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-container" onClick={(e) => e.stopPropagation()}>

                    <div className="modal-header">
                        <h2>Log In</h2>
                        
                        <button className="modal-close" onClick={onClose}>
                            ⨉
                        </button>
                      
                    </div>
                    
                    {/* if user is logged in  */}
                    {isLoggedIn && !loading? (
                        <div className="modal-content">
                            <p>You are currently logged in.</p>

                            {error && <p className="error-text">{error}</p>}
                            <button type="button" className="logout-button" onClick={handleLogout}>
                                {loading ? "Logging out..." : "Log out"}
                            </button>
                            
                        </div>
                    ):(
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

                                <button type="button" className="forgot-password" onClick={() => setShowForgotPassword(true)}>Change Your Password?</button>
                            </div>
                            
                            {error && <p className="error-text">{error}</p>}
                            <button type="submit" className="login-button">
                                {loading ? "Logging in..." : "Log In"}
                            </button>
                            
                            <h4>Don't have an account? <a href="#" className="sign-up-link" onClick={() => setShowSignUp(true)}>Sign Up</a></h4> 
                        </form> 
                    )}
                </div>
            </div>
            {showForgotPassword && (
                <ModalPassChange onClose={() => setShowForgotPassword(false)}/>
            )}
            {showSignUp && (
                <ModalSignUp onClose={() => setShowSignUp(false)}/>
            )}
        </>
    );
};

export default ModalLogin;
