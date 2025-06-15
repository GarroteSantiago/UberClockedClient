import React, { useState } from 'react';
import { Range } from 'react-range';
import styles from './RangeInput.module.scss';


function RangeInput({ min, max, step, option, defaultValues = [min, max], onChange }) {
    const [values, setValues] = useState(defaultValues);

    const handleChange = (newValues) => {
        setValues(newValues);
        if (onChange) onChange(newValues);
    };

    return (
        <div>
            <label className={styles.label}>Rango de {option}</label>

            <Range
                values={values}
                step={step}
                min={min}
                max={max}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className={styles.track}
                        style={{
                            ...props.style,
                            background: `linear-gradient(to right, #ccc ${values[0] / max * 100}%, #eb0055 ${values[0] / max * 100}% ${values[1] / max * 100}%, #ccc ${values[1] / max * 100}%)`
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div {...props} className={styles.thumb} />
                )}
            />

            <div className={styles.values}>
                <div className={styles.box}>
                    <span className={styles.valueLabel}>Mínimo</span>
                    <div className={styles.value}>{values[0]}</div>
                </div>
                <div className={styles.box}>
                    <span className={styles.valueLabel}>Máximo</span>
                    <div className={styles.value}>{values[1]}</div>
                </div>
            </div>
        </div>
    );
}

export default RangeInput;
