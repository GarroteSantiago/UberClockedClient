import React from "react";
import styles from "./VerticalCard.module.scss";
import {Link} from "react-router-dom";

function VerticalCard({children, redirectTo}) {
    return (
        <Link className={styles.verticalCard} to={redirectTo} >
            {children}
        </Link>
    )
}
export default VerticalCard;