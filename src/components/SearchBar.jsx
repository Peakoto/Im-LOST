// la search bar yessssss

import React, {useState} from "react";
import magGlass from "../assets/mag_glass.png";
import "./SearchBar.css";

const SearchBar = ({onSearch}) => {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        onSearch(input);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <div className="searchbar">
            <input 
                type="text"
                placeholder="Search la item title..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="searchbar-input"
            />

            <button
                className="searchbar-button"
                onClick={handleSearch}
            >
                <img 
                    src={magGlass} 
                    alt="Search"
                    className="searchbar-icon"
                />
            </button>
        </div>
    )
}

export default SearchBar;
