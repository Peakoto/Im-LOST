// each button will navigate to their respective files 
// navigate to features > auth/history/items > Modal+'name'.jsx

// account login
// filter
// history
// change password
// save password
// post lost item
// post found ite
// edit history (pencil icon on profile)
// delete history (trashcan icon on profile)

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

const Button = ({ type, label, to, onClick}) => {
    // const navigate = useNavigate();
    
    const handleClick = () => {
        if (onClick) onClick();
        // if (to) navigate(to);
    };

    return (
        <button className={`btn btn-${type}`} onClick={handleClick}>
            {label}
        </button>
    );
};

export default Button;