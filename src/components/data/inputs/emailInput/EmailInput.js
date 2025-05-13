import React from 'react';
import styles from '../Input.module.scss';

function EmailInput({value: externalValue, onChange: externalOnChange, placeholder, maxLength = 50, pattern = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"}) {
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
            type="email"
            value={value}
            onChange={handleChange}
            placeholder={placeholder || "Enter email"}
            required
            minLength={5}
            maxLength={maxLength}
            size={10}
            pattern={pattern}
        />
    );
}
export default EmailInput;