// pop-up consists of
// - Sort By (use rd_sortby.jsx)
// - Calendar (use Calendar.jsx)
// - Category list (use rd_category.jsx)
// - Location list (use rd_location.jsx)
// - Color list (use cb_color.jsx)

import React, {useState} from "react";
import "./ModalFilter.css";
import CalendarFilter from "../filters/CalendarFilter";
import CategoryFilter from "../filters/CategoryFilter";
import LocationFilter from "../filters/LocationFilter";
import SortByFilter from "../filters/SortByFilter";
import Dropdown from "../../components/Dropdown";
import ColorFilter from "../filters/ColorFilter";

const ModalFilter = ({onClose, 
    appliedStartDate, appliedEndDate, setAppliedStartDate, setAppliedEndDate,
    appliedCategory, setAppliedCategory,
    appliedLocation, setAppliedLocation,
    appliedSortBy, setAppliedSortBy,
    appliedColor, setAppliedColor}) => {

    const [enabledFilters, setEnabledFilters] = useState({
        calendar: !!appliedStartDate || !!appliedEndDate,
        location: !!appliedLocation,
        category: !!appliedCategory,
        color: appliedColor.length > 0, // is an array, so make it true if length > 0
        sortBy: !!appliedSortBy
    });

    const [tempStartDate, setTempStartDate] = useState(appliedStartDate);
    const [tempEndDate, setTempEndDate] = useState(appliedEndDate);

    const [tempCategory, setTempCategory] = useState(appliedCategory);
    const [tempLocation, setTempLocation] = useState(appliedLocation);
    const [tempSortBy, setTempSortBy] = useState(appliedSortBy);

    const [tempColor, setTempColor] = useState(appliedColor);

    const handleCheckbox = (filterName) => {
        setEnabledFilters((prev) => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    return (
        <div 
            className="modal-overlay"
            onClick={onClose}
        >
            <div 
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >

                {/* La ⨉ close button */}
                <div className="modal-header">
                <h2>Filter</h2>
                <button 
                    className="close-btn"
                    onClick={onClose}
                >
                    ⨉
                </button>
                </div>

                <div className="modal-body">   
                    {/* Calendar Filter */}
                    <div className="filter-section">
                        <label className="filter-title">
                            <input 
                                type="checkbox" 
                                checked={enabledFilters.calendar}
                                onChange={() => handleCheckbox("calendar")}
                            />
                            <h3>Calendar</h3>
                        </label>

                        {enabledFilters.calendar && (
                            <CalendarFilter
                                startDate={tempStartDate}
                                endDate={tempEndDate}
                                setStartDate={setTempStartDate}
                                setEndDate={setTempEndDate}
                            />
                        )}
                    </div>

                    {/* Location Filter */}
                    <div className="filter-section">
                        <label className="filter-title">
                            <input 
                                type="checkbox" 
                                checked={enabledFilters.location}
                                onChange={() => handleCheckbox("location")}
                            />
                            <h3>Location</h3>
                        </label>

                        {enabledFilters.location && (
                            <Dropdown label={tempLocation || "Select Location"}>
                                <LocationFilter
                                    selected={tempLocation}
                                    setSelected={setTempLocation}
                                />
                            </Dropdown>
                        )}
                    </div>

                    {/* Category Filter */}
                    <div className="filter-section">
                        <label className="filter-title">
                            <input 
                                type="checkbox" 
                                checked={enabledFilters.category}
                                onChange={() => handleCheckbox("category")}
                            />
                            <h3>Category</h3>
                        </label>

                        {enabledFilters.category && (
                            <Dropdown label={tempCategory || "Select Category"}>
                                <CategoryFilter
                                    selected={tempCategory}
                                    setSelected={setTempCategory}
                                />
                            </Dropdown>
                        )}
                    </div>

                    {/* Color Filter */}
                    <div className="filter-section">
                        <label className="filter-title">
                            <input 
                                type="checkbox" 
                                checked={enabledFilters.color}
                                onChange={() => handleCheckbox("color")}
                            />
                            <h3>Color</h3>
                        </label>

                        {enabledFilters.color && (
                            <Dropdown label={tempColor.length > 0 ? `${tempColor.length} selected` : "Select Colors"}>
                                <ColorFilter
                                    selected={tempColor}
                                    setSelected={setTempColor}
                                />
                            </Dropdown>
                        )}
                    </div>

                    {/* Sort By Filter */}
                    <div className="filter-section">
                        <label className="filter-title">
                            <input 
                                type="checkbox" 
                                checked={enabledFilters.sortBy}
                                onChange={() => handleCheckbox("sortBy")}
                            />
                            <h3>Sort By</h3>
                        </label>

                        {enabledFilters.sortBy && (
                            <Dropdown label={tempSortBy || "Sort By"}>
                                <SortByFilter
                                    selected={tempSortBy}
                                    setSelected={setTempSortBy}
                                />
                            </Dropdown>
                        )}
                    </div>


                    {/* Apply Button */}
                    <div className="modal-footer">
                        <button 
                            className="apply-btn"
                            onClick={() => {
                                // calendar
                                if (enabledFilters.calendar) {
                                    setAppliedStartDate(tempStartDate);
                                    setAppliedEndDate(tempEndDate);
                                } else {
                                    setAppliedStartDate("");
                                    setAppliedEndDate("");
                                }

                                // location
                                if (enabledFilters.location) {
                                    setAppliedLocation(tempLocation);
                                } else {
                                    setAppliedLocation("");
                                }

                                // category
                                if (enabledFilters.category) {
                                    setAppliedCategory(tempCategory);
                                } else {
                                    setAppliedCategory("");
                                }

                                // color
                                if (enabledFilters.color) {
                                    setAppliedColor(tempColor);
                                } else {
                                    setAppliedColor([]);
                                }

                                // sort by
                                if (enabledFilters.sortBy) {
                                    setAppliedSortBy(tempSortBy);
                                } else {
                                    setAppliedSortBy("");
                                }

                                onClose();
                            }}    
                        >
                            Apply
                        </button>
                    </div>
                
                </div>

            </div>
        </div>
    );
};

export default ModalFilter;