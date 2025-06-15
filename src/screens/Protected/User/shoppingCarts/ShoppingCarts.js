import React, {useEffect} from "react";
import styles from "./ShoppingCarts.module.scss";
import {useState} from "react";
import {createShoppingCart, readAllShoppingCartsOfUser} from "../../../../api/shoppingCart.js";
import ShoppingCartCard from "../../../../components/cards/shoppingCart/ShoppingCartCard.js";
import AddModal from "../../../../components/buttons/modal/addModal/AddModal.js";
import Form from "../../../../components/data/forms/Form.js";
import TextInput from "../../../../components/data/inputs/text/TextInput.js";

function ShoppingCarts() {
    const [shoppingCarts, setShoppingCarts] = useState([]);
    const [shoppingCartName, setShoppingCartName] = useState("");

    useEffect(() => {
        const saveCarts = async () => {
            const response = await readAllShoppingCartsOfUser();
            console.log(response.data);
            const activeCarts = response.data.filter(cart => cart.is_active);
            setShoppingCarts(activeCarts);
        };
        saveCarts();
    }, []);


    return (
        <div className={styles.screen}>
            <h1 className={styles.title}>My Shopping Carts</h1>
            <div className={styles.cards}>
                {shoppingCarts.map((shoppingCart) => (
                    <ShoppingCartCard shoppingCart={shoppingCart}/>
                ))}
            </div>
            <AddModal>
                <Form
                    title="Create new cart"
                    redirectTo="/ShoppingCarts"
                    buttonText="Add cart"
                    submitMethod={() => createShoppingCart(shoppingCartName)}
                >
                    <TextInput value={shoppingCartName} onChange={(e) => setShoppingCartName(e.target.value)} placeholder="Cart name"/>
                </Form>
            </AddModal>
        </div>
    )
}
export default ShoppingCarts;