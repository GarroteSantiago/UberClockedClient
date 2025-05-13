import React from 'react';
import styles from './DropDownTextButton.module.scss';
import {Link} from "react-router-dom";

function DropDownTextButton({text, route}) {
    const isOnPage = route === window.location.pathname;
    return (
        <Link className={isOnPage ? styles.visitedTextButton : styles.textButton} to={route}>{text}</Link>
    )
}
export default DropDownTextButton;