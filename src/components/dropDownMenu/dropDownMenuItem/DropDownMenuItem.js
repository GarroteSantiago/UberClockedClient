import React from "react";
import styles from './DropDownMenuItem.module.scss'

function DropDownMenuItem({children, index}) {
    return (
        <div key={index} className={styles.dropDownMenuItem}>
            {children}
        </div>
    )
}
export default DropDownMenuItem