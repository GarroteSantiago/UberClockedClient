import React from "react";
import styles from "./PrincipalButton.module.scss"

function PrincipalButton({onClick, text}) {
    return (
        <button className={styles.principalButton} onClick={onClick} type="button">
            {text}
        </button>
    )
}
export default PrincipalButton;