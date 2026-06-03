// la search bar yessssss

import React, {useState, useEffect} from "react";
import magGlass from "../assets/mag_glass.png";
import "./SearchBar.css";
import useDebounce from "../hooks/useDebounce";

const SearchBar = ({onSearch}) => {
    const [input, setInput] = useState("");

    const debouncedSearch = useDebounce(input, 500);

    useEffect(() => {

        if (!debouncedSearch.trim()) {
            onSearch("");
            return;
        }

        onSearch(debouncedSearch);

    }, [debouncedSearch, onSearch]);

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
                placeholder="Search item title..."
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
