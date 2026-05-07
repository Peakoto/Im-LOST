// consists of 
// red, orange, yellow, green, blue, purple, pink, brown, black, white, grey

import React from "react";
import DropdownCheckBox from "../../components/DropdownCheckBox"

const ColorFilter = ({selected, setSelected}) => {
    return ( 
        <DropdownCheckBox
            name="color"
            options={[
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue",
                "Purple",
                "Pink",
                "Brown",
                "Black",
                "White",
                "Grey"
            ]}
            selected={selected}
            setSelected={setSelected}
        />
    )
}

export default ColorFilter