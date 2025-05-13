import React from "react";
import styles from "./NavTextButton.module.scss";
import {Link} from "react-router-dom";

function NavTextButton({text, route}) {
    return (
        <Link className={styles.navTextButton} to={route}>{text}</Link>
    )
}
export default NavTextButton;