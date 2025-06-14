import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import stylesInput from "../Input.module.scss";
import styles from "./DropDownInput.module.scss";

const DropDownInput = forwardRef(({ placeholderText = "Todos", options = [], defaultSelected = null, onChange }, ref) => {
    const initialId = defaultSelected || (options.length > 0 ? options[0].id : '');
    const [selectedId, setSelectedId] = useState(initialId);

    // Update selectedId when options change (optional but safe)
    useEffect(() => {
        if (!options.find(opt => opt.id === selectedId)) {
            setSelectedId(options[0]?.id || '');
        }
    }, [options]);

    // Imperative methods
    useImperativeHandle(ref, () => ({
        getSelected: () => options.find((option) => option.id === selectedId),
        setSelected: (id) => {
            if (options.some(option => option.id === id)) {
                setSelectedId(id);
            }
        },
    }));

    // Handle change
    const handleChange = (e) => {
        setSelectedId(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <select value={selectedId} onChange={handleChange} className={stylesInput.input}>
            <option key={0} value="">
                {placeholderText}
            </option>
            {options.map(({ id, label }) => (
                <option key={id} value={id} className={styles.option}>
                    {label}
                </option>
            ))}
        </select>
    );
});

export default DropDownInput;
