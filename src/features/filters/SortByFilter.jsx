// consists of
// - item name ascending
// - item name descending
// - date ascending
// - date descending

import React from "react";
import DropdownRadio from "../../components/DropdownRadio";

const SortByFilter = ({
    selected,
    setSelected,
    closeDropdown
}) => {

    return (
        <DropdownRadio
            name="sortBy"
            options={[
                "Newest",
                "Oldest",
                "A-Z",
                "Z-A"
            ]}
            selected={selected}
            setSelected={setSelected}
            closeDropdown={closeDropdown}
        />
    );
};

export default SortByFilter;