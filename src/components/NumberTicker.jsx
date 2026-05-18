import React from "react";

const NumberTicker = ({ name, number, setNumber, minValue, maxValue, stepValue }) => {
    return (
        <>
            <p>{name}, {number}, {setNumber}, {minValue}, {maxValue}, {stepValue}</p>
            <label htmlFor="">Floor
                <input type="number" name={name} min={minValue} max={maxValue}
                 />
            </label>
        </>
    )

}

export default NumberTicker;