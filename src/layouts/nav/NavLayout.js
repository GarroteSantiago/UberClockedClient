import React from "react";
import styles from "./NavLayout.module.scss";
import NavBar from "../../components/nav/navBar/NavBar.js"

function NavLayout({ children }) {
    return (
        <div className={styles.screen}>
            <NavBar />
            {children}
        </div>
    )
}
export default NavLayout;