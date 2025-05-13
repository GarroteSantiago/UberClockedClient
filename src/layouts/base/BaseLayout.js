import React from "react";
import {Outlet} from "react-router-dom";
import styles from "./BaseLayout.module.scss";

function BaseLayout() {
    return(
        <div className={styles.screen}>
            <Outlet />
        </div>
    )
}
export default BaseLayout;