import React from 'react';
import styles from '../Input.module.scss';

function QuantityInput({value: externalValue, onChange: externalOnChange, placeholder=0, min = 1, pattern = "^[1-9]\\d*$", hidden=false}) {
    const [internalValue, setInternalValue] = React.useState(externalValue || "");
    const [isValid, setIsValid] = React.useState(true);

    const handleChange = function(e) {
        const val = e.target.value;
        if (externalOnChange) {
            externalOnChange(e);
        } else {
            setInternalValue(val);
        }
        setIsValid(new RegExp(pattern).test(val) && Number(val) >= min);
    };

    const value = externalValue !== undefined ? externalValue : internalValue;

    return (
        <input
            className={isValid ? styles.input : styles.incorrectInput}
            type="number"
            value={value}
            onChange={handleChange}
            placeholder={placeholder || "Enter quantity"}
            required
            hidden={hidden}
            min={min}
            size={10}
            pattern={pattern}
        />
    );
}
export default QuantityInput;