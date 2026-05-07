// dropdown + radio
// consists of 
// classroom, canteen, LKC, gym, hallway, parking lot, lobby, lift area, toilet, others

import React from "react";
import DropdownRadio from "../../components/DropdownRadio";

const LocationFilter = ({selected, setSelected, closeDropdown}) => {
    return ( 
        <DropdownRadio
            name="location"
            options={[
                "Canteen",
                "Classroom",
                "Gym",
                "Hallway",
                "Lift Area",
                "LKC",
                "Lobby",
                "Parking Lot",
                "Toilet",
                "Others"
            ]}
            selected={selected}
            setSelected={setSelected}
            closeDropdown={closeDropdown}
        />
    )
}

export default LocationFilter;