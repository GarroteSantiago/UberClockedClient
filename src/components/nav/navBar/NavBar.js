import React from 'react';
import styles from './NavBar.module.scss';
import NavLogo from "../../logos/navLogo/NavLogo.js";
import DropDownMenuTextButton from "../../buttons/textButtons/dropDownTextButton/DropDownTextButton.js"
import DropDownMenu from "../../dropDownMenu/DropDownMenu.js";
import NavTextButton from "../../buttons/textButtons/navTextButton/NavTextButton.js";
import {logout} from "../../../api/authentication.js";
import {hasPermission, isAuthenticated} from "../../../utils/authorizationChecker.js";
import LogoutModal from "../../buttons/modal/logoutModal/LogoutModal.js";
import Form from "../../../components/data/forms/Form.js";

function NavBar() {
    const isAuthed = isAuthenticated();
    const isAdmin = hasPermission('admin');

    const storeOptions = [
        {
            text: "PC",
            route: "/cards/pc",
        },
        {
            text: "Server",
            route: "/cards/server",
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
                <DropDownMenuTextButton text="Home" route="/home" />
                <DropDownMenu options={storeOptions} buttonText={"Store"} />
                <DropDownMenu options={buildOptions} buttonText={"Build"} />
                <DropDownMenuTextButton text="Roulette" route="/roulette" />
            </div>
            {isAuthed && (
                <div className={styles.imageOptions}>
                    <LogoutModal>
                        <Form title={"Logout"} buttonText={"Logout"} redirectTo={"/"} submitMethod={logout}/>
                    </LogoutModal>
                    <NavTextButton text="My shopping carts" route="/ShoppingCarts" />
                    {isAdmin && (
                        <NavTextButton text="Users" route="/users" />
                    )}
                </div>
            )}
            {!isAuthed && (
                <div className={styles.textOptions}>
                    <NavTextButton text="Login" route="/login" />
                    <NavTextButton text="Sign Up" route="/signUp" />
                </div>
            )}
        </div>
    )
}

export default NavBar;