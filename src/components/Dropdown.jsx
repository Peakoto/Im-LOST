// the main dropdown ui
import React, { useEffect, useState, useRef } from "react";
import "./Dropdown.css";
import DropArrow from "../assets/arrow.png";


const Dropdown = ({ label, children, type="default" }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    return (
        <div className="dropdown" ref={ref}>
            <button 
                className={`dropdown-btn dropdown-btn-${type}`}
                onClick={() => setOpen(!open)}
            >
                {label}

                <img 
                    src={DropArrow} 
                    alt="dropdown arrow"
                    className={`dropdown-arrow ${open ? "open" : ""}`} 
                />
                
            </button>

            {open && (
                <div className="dropdown-menu">
                    {React.cloneElement(children, { closeDropdown: () => setOpen(false) })}
                </div>
            )}
        </div>
    );
};

export default Dropdown;