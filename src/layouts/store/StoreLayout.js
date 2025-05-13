import React from "react";
import styles from "./StoreLayout.module.scss";
import NavBar from "../../components/nav/navBar/NavBar.js"
import {Outlet} from "react-router-dom";

function StoreLayout() {
    return (
        <div className={styles.screen}>
            <NavBar />
            <Outlet />
        </div>
    )
}
export default StoreLayout;