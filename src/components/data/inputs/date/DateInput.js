import React from 'react';
import styles from '../Input.module.scss';

function DateInput({
                       value: externalValue,
                       onChange: externalOnChange,
                       placeholder = "YYYY-MM-DD",
                       max="9999/12/31",
                       min= new Date().toISOString().split('T')[0],
                       pattern = "^\\d{4}-\\d{2}-\\d{2}$" // formato YYYY-MM-DD
                   }) {
    const [internalValue, setInternalValue] = React.useState(externalValue || "");
    const [isValid, setIsValid] = React.useState(true);

    const handleChange = function(e) {
        const val = e.target.value;
        if (externalOnChange) {
            externalOnChange(e);
        } else {
            setInternalValue(val);
        }
        setIsValid(new RegExp(pattern).test(val));
    };

    const value = externalValue !== undefined ? externalValue : internalValue;

    return (
        <input
            className={isValid ? styles.input : styles.incorrectInput}
            type="date"
            value={value}
            onChange={handleChange}
            placeholder={placeholder || "YYYY-MM-DD"}
            required
            pattern={pattern}
            max={max}
            min={min}
        />
    );
}

export default DateInput;
