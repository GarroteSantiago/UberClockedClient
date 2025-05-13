import React from "react";
import styles from "./SubmitButton.module.scss";

function SubmitButton({text}) {
    return (
        <button type="submit" className={styles.button}>{text}</button>
    )
}
export default SubmitButton;