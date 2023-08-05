import React, { useState } from "react";

const MultiSelectCheckbox = (
    selectedDays: any[],
    setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>
) => {

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id } = event.target;
        setSelectedDays(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(day => day !== id)
                : [...prevSelected, id]
        );
    };

    return (
        <>
            
        </>
    );
};

export default MultiSelectCheckbox;