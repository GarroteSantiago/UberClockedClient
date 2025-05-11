import React from "react";
import styles from "./Start.module.scss";
import StartLogo from "../../../components/logos/startLogo/StartLogo.js";
import NavTextButton from "../../../components/buttons/textButtons/navTextButton/NavTextButton.js";

function Start() {
    return (
        <div className={styles.screen}>
            <div className={styles.logo}>
                <StartLogo />
            </div>
            <div className={styles.options}>
                <NavTextButton text="Login" route="/Login" />
                <NavTextButton text="Sign Up" route="/signUp" />
                <NavTextButton text="Guest" route="/home" />
            </div>
        </div>
    )
}
export default Start;