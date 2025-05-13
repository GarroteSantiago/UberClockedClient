import React, {useEffect, useState} from "react";
import styles from "./Components.module.scss"
import {readAllComponents} from "../../../../api/component.js";

function Components() {
    const [components, setComponents] = useState([]);



    useEffect( () => {
        const saveComponents = async () => {
            const response = await readAllComponents();
            setComponents(response.data)
        }

        saveComponents();
    },[])

    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <p className={styles.headerCell}>Id</p>
                <p className={styles.headerCell}>Name</p>
                <p className={styles.headerCell}>Description</p>
                <p className={styles.headerCell}>Modify</p>
                <p className={styles.headerCell}>Delete</p>
            </div>
            <div className={styles.tableBody}>
                {components.map((product) => (
                    <div className={styles.element} key={product.id}>
                        <p className={styles.cell}>{product.id}</p>
                        <p className={styles.cell}>{product.name}</p>
                        <p className={styles.cell}>{product.description}</p>
                        <p className={styles.cell}>Modify</p>
                        <p className={styles.cell} >Delete</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Components;