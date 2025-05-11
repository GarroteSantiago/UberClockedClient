import React from 'react';
import styles from './DropDownButton.module.scss';

function DropDownMenuButton({ onClick, isOpen, text }) {
    const url = window.location.pathname;
    const isOnUrl = url.includes(text.toLowerCase());

    return (
        <button
            className={isOnUrl ? styles.menuButton : styles.visitedMenuButton}
            onClick={onClick}
            aria-expanded={isOpen}
        >
            {text}
        </button>
    );
}

export default DropDownMenuButton;