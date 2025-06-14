import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import stylesInput from "../Input.module.scss";
import styles from "./DropDownInput.module.scss";

const DropDownInput = forwardRef(({ placeholderText = "Todos", options = [], defaultSelected = "", onChange }, ref) => {
    const [selectedId, setSelectedId] = useState(defaultSelected);

    useEffect(() => {
        setSelectedId(defaultSelected);
    }, [defaultSelected]);

    useImperativeHandle(ref, () => ({
        getSelected: () => options.find(option => option.id === selectedId),
        setSelected: (id) => {
            if (options.some(option => option.id === id) || id === "") {
                setSelectedId(id);
            }
        },
    }));

    const handleChange = (e) => {
        setSelectedId(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <select value={selectedId} onChange={handleChange} className={stylesInput.input}>
            <option value="">{placeholderText}</option>
            {options.map(({ id, label }) => (
                <option key={id} value={id} className={styles.option}>
                    {label}
                </option>
            ))}
        </select>
    );
});

export default DropDownInput;
