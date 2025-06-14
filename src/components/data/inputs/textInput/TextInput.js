import React from 'react';
import styles from '../Input.module.scss';

function TextInput({value: externalValue, onChange: externalOnChange, placeholder, minLength=0, maxLength=20, pattern = "^[A-Za-z0-9,]+$"}) {
    const [internalValue, setInternalValue] = React.useState(externalValue || "");
    const [isValid, setIsValid] = React.useState(true);

    const handleChange = function(e) {
        const val = e.target.value;
        if (externalOnChange) {
            externalOnChange(e); // Propagate to parent
        } else {
            setInternalValue(val);
        }
        setIsValid(new RegExp(pattern).test(val));
    };

    const value = externalValue !== undefined ? externalValue : internalValue;

    return (
        <input
            className={isValid ? styles.input : styles.incorrectInput}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required
            minLength={minLength}
            maxLength={maxLength}
            size={10}
            pattern={pattern}
        />
    );
}
export default TextInput;