import React from "react";
import "./CalendarFilter.css";

const CalendarFilter = ({startDate, endDate, setStartDate, setEndDate}) => {
    return (
        <div className="calendar-filter">
            <div className="calendar-group">
                <label>From</label>
                <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="calendar-input"
                />
            </div>

            <div className="calendar-group">
                <label>To</label>
                <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="calendar-input"
                />
            </div>

        </div>
    )
}

export default CalendarFilter