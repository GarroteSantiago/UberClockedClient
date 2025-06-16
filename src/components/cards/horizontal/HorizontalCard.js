import React from "react";
import styles from "./HorizontalCard.module.scss";
import {Link} from "react-router-dom";

function HorizontalCard({children, redirectTo}) {
    return (
        <Link className={styles.horizontalCard} to={redirectTo} >
            {children}
        </Link>
    )
}
export default HorizontalCard;