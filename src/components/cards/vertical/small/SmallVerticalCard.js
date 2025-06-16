import React from "react";
import styles from "./SmallVerticalCard.module.scss";
import {Link} from "react-router-dom";

function SmallVerticalCard({children, redirectTo}) {
    return (
        <Link className={styles.verticalCard} to={redirectTo} >
            {children}
        </Link>
    )
}
export default SmallVerticalCard;