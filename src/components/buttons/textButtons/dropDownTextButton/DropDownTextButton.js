import React from 'react';
import styles from './DropDownTextButton.module.css';
import {Link} from "react-router-dom";

function DropDownTextButton({text, route}) {
    const isOnPage = route === window.location.pathname;
    return (
        <Link className={isOnPage ? styles.textButton : styles.visitedTextButton} to={route}>{text}</Link>
    )
}
export default DropDownTextButton;