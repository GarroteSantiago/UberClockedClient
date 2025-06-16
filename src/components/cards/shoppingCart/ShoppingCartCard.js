import React from "react";
import styles from "./ShoppingCartCard.module.scss";
import DeleteModal from "../../buttons/modal/deleteModal/DeleteModal.js";
import Form from "../../data/forms/Form.js";
import {deleteCart} from "../../../api/shoppingCart.js";
import {Link} from "react-router-dom";

function ShoppingCartCard({shoppingCart}) {
    return (
        <div className={styles.card} key={shoppingCart.id}>
            <Link to={"/profile/shoppingCarts/"+shoppingCart.id} className={styles.info}>
                <div>
                    <h3 className={styles.name}>{shoppingCart.name}</h3>
                    <p className={styles.date}>Last modification: {(shoppingCart.updatedAt).toString().slice(0,10)}</p>
                </div>
            </Link>
            <div className={styles.actions}>
                <DeleteModal>
                    <Form
                        submitMethod={() => deleteCart(shoppingCart.id)}
                        buttonText="Delete"
                        title={"Are you sure?"}
                        redirectTo="profile/shoppingCarts"
                    />
                </DeleteModal>
            </div>
        </div>
    )
}
export default ShoppingCartCard;