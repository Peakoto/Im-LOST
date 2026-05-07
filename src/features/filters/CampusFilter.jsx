// dropdown + radio button
// consists of 
// anggrek, alam sutera, syahdan & kijang, bandung, malang, bekasi, senayan, semarang

// NOTE: FORGOT THAT CAMPUS IS NOT ON THE FILTER LAYOUT LIST

import React from "react";
import DropdownRadio from "../../components/DropdownRadio";

const CampusFilter = ({selected, setSelected, closeDropdown}) => {
    return ( 
        <DropdownRadio
            name="campus"
            options={[
                "Alam Sutera",
                "Anggrek",
                "Bekasi",
                "Bandung",
                "Malang",
                "Semarang",
                "Senayan",
                "Syahdan & Kijang"
            ]}
            selected={selected}
            setSelected={setSelected}
            closeDropdown={closeDropdown}
        />
    )
}

export default CampusFilter