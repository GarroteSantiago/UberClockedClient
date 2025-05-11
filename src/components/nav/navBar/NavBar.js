import React from 'react';
import styles from './NavBar.module.scss';
import NavLogo from "../../logos/navLogo/NavLogo.js";
import DropDownMenuTextButton from "../../buttons/textButtons/dropDownTextButton/DropDownTextButton.js"
import DropDownMenu from "../../dropDownMenu/DropDownMenu.js";
import NavTextButton from "../../buttons/textButtons/navTextButton/NavTextButton.js";

import { isAuthenticated } from "../../../utils/authorizationChecker.js";

function NavBar() {
    const isAuthed = isAuthenticated();

    const storeOptions = [
        {
            text: "PC",
            route: "/store/pc",
        },
        {
            text: "Server",
            route: "/store/server",
        }
    ]
    const buildOptions = [
        {
            text: "PC",
            route: "/build/pc",
        },
        {
            text: "Server",
            route: "/build/server",
        }
    ]

    return (
        <div className={styles.navBar}>
            <div className={styles.logo}>
                <NavLogo />
            </div>
            <div className={styles.navOptions}>
                <DropDownMenuTextButton text="Home" route="/" />
                <DropDownMenu options={storeOptions} buttonText={"Store"} />
                <DropDownMenu options={buildOptions} buttonText={"Build"} />
                <DropDownMenuTextButton text="Roulette" route="/" />
            </div>
            {isAuthed && (
                <div className={styles.textOptions}>
                    <NavTextButton text="Login" route="/login" />
                    <NavTextButton text="Sign Up" route="/signUp" />
                </div>
            )}
            {!isAuthed && (
                <div className={styles.imageOptions}>
                </div>
            )}
        </div>
    )
}