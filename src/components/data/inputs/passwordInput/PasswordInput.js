import React from 'react';
import styles from '../Input.module.scss';

function PasswordInput({value: externalValue, onChange: externalOnChange, placeholder, minLength = 8, maxLength = 30, pattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"}) {
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
            type="password"
            value={value}
            onChange={handleChange}
            placeholder={placeholder || "Enter password"}
            required
            minLength={minLength}
            maxLength={maxLength}
            size={10}
            pattern={pattern}
        />
    );
}