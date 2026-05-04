// *LATER THE BUTTONS WOULD LEAD TO THE features > filters > files except 'FilterModal.jsx'

// dropdown + radio button
// consists of 
// anggrek, alam sutera, syahdan & kijang, bandung, malang, bekasi, senayan, semarang


// dropdown + radio buttons
// consists of
// id card, electronics, stationery, accessories, documents, clothing, others


// dropdown + radio
// consists of 
// classroom, canteen, LKC, gym, hallway, parking lot, lobby, lift area, toilet, others


// consists of
// - item name ascending
// - item name descending
// - date ascending
// - date descending

import React from "react";

const DropdownRadio = ({ name, options, selected, setSelected, closeDropdown }) => {
    return (
        <>
            {options.map((option, index) => (
                <label key={index} className="dropdown-item">
                    <input 
                        type="radio" 
                        name={name}
                        value={option}
                        checked={selected === option}
                        onChange={() => {
                            setSelected(option);
                            closeDropdown();
                        }}
                    />
                    <span>{option}</span>
                </label>
            ))}
        </>
    )
}

export default DropdownRadio;