import React from "react";
import styles from "./Table.module.scss";

function Table({ headers = [], rows = [], renderRow }) {
    return (
        <div className={styles.products}>
            <div className={styles.product}>
                {headers.map((header, index) => (
                    <p key={index}>{header}</p>
                ))}
            </div>
            {rows.length === 0 ? (
                <p>No data available</p>
            ) : (
                rows.map((row, index) => (
                    <div key={row.id || index} className={styles.product}>
                        {renderRow(row)}
                    </div>
                ))
            )}
        </div>
    );
}
export default Table;
