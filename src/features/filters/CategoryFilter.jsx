// dropdown + radio buttons
// consists of
// id card, electronics, stationery, accessories, documents, clothing, others

import React from "react";
import DropdownRadio from "../../components/DropdownRadio";

const CategoryFilter = ({selected, setSelected, closeDropdown}) => {
    return ( 
        <DropdownRadio
            name="category"
            options={[
                "Accessories",
                "Bottle",
                "Clothing",
                "Documents",
                "Electronics",
                "ID Card",
                "Stationery"
            ]}
            selected={selected}
            setSelected={setSelected}
            closeDropdown={closeDropdown}
        />
    )
}

export default CategoryFilter;