import React from 'react';
import styles from './DropDownButton.module.scss';

function DropDownMenuButton({ onClick, isOpen, text }) {
    const url = window.location.pathname;
    const isOnUrl = url.includes(text.toLowerCase());

    return (
        <button
            className={isOnUrl ? styles.visitedMenuButton : styles.menuButton}
            onClick={onClick}
            aria-expanded={isOpen}
        >
            {text}
        </button>
    );
}

export default DropDownMenuButton;