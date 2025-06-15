import React, {useEffect} from "react";
import styles from "./AdminPanel.module.scss";
import {readMe} from "../../../../api/user/user.js";
import {Link} from "react-router-dom";

function AdminPanel() {
    const [admin, setAdmin] = React.useState({});

    useEffect(() => {
        const readUserData = async () => {
            const response = await readMe()
            setAdmin(response.data)
            console.log(response)
        }
        readUserData();
    },[])

    return (
        <div className={styles.layout}>
            <div className={styles.myInfo}>
                <h1>Welcome admin, {admin.name_tag}</h1>
            </div>
            <div className={styles.panel}>
                <Link className={styles.panelCard} to="/admin/products/">
                    <div className={styles.panelCard}>
                        <p>Products</p>
                    </div>
                </Link>
                <Link className={styles.panelCard} to="/admin/components/">
                    <div className={styles.panelCard}>
                        <p>Components</p>
                    </div>
                </Link>
                <Link className={styles.panelCard} to="/admin/users/">
                    <div className={styles.panelCard}>
                        <p>Users</p>
                    </div>
                </Link>
                <Link className={styles.panelCard} to="/admin/reviews/">
                    <div className={styles.panelCard}>
                        <p>Reviews</p>
                    </div>
                </Link>
                <Link className={styles.panelCard} to="/admin/orders/">
                    <div className={styles.panelCard}>
                        <p>Orders</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default AdminPanel;