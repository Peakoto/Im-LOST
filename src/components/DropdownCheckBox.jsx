// color consist of (checkbox)
// red, orange, yellow, green, blue, purple, pink, brown, black, white, grey
import React from "react";

const DropdownCheckBox = ({ name, options, selected, setSelected }) => {

    const handleChange = (option) => {
        if (selected.includes(option)) {
            setSelected(selected.filter((item) => item !== option));
        } else {
            setSelected([...selected, option]);
        }
    };

    return (
        <>
            {options.map((option, index) => (
                <label key={index} className="dropdown-item">
                    <input 
                        type="checkbox"
                        name={name}
                        value={option}
                        checked={selected.includes(option)}
                        onChange={() => handleChange(option)}
                    />
                    <span>{option}</span>
                </label>
            ))}
        </>
    )
}

export default DropdownCheckBox;