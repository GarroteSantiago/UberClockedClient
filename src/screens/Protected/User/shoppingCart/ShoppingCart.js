import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import styles from "./ShoppingCart.module.scss";
import {
    createProductInShoppingCart,
    deleteProductInShoppingCart,
    readAllProductsInShoppingCart,
    readCartById, updateCart
} from "../../../../api/shoppingCart.js";
import DeleteModal from "../../../../components/buttons/modal/deleteModal/DeleteModal.js";
import Form from "../../../../components/data/forms/Form.js";
import ModifyModal from "../../../../components/buttons/modal/modifyModal/ModifyModal.js";
import QuantityInput from "../../../../components/data/inputs/quantity/QuantityInput.js";
import TextInput from "../../../../components/data/inputs/text/TextInput.js";
import PrincipalButton from "../../../../components/buttons/principal/PrincipalButton.js";

function ShoppingCart() {
    const [newAmount, setNewAmount] = React.useState("");
    const [newName, setNewName] = React.useState("");
    const [products, setProducts] = useState([]);
    const [shoppingCart, setShoppingCart] = useState({});
    const {id} = useParams();
    const location = useLocation();

    useEffect(() => {
        const getShoppingCart = async () => {
            const response = await readCartById(id);
            setShoppingCart(response.data);
        }
        const getProducts = async () => {
            const response = await readAllProductsInShoppingCart(id);
            setProducts(response.data);
        }
        getShoppingCart();
        getProducts();
    }, [id]);

    const deleteProduct = async (product_id) => {
        const response = await deleteProductInShoppingCart(id, product_id);
        console.log(response);
    }
    const modifyCart = async () => {
        const response = await updateCart(id, {name:newName});
        console.log(response);
    }
    const modifyProductAmount = async (product_id) => {
        const deleteResponse = deleteProduct(product_id);
        console.log(deleteResponse);
        const createResponse = await createProductInShoppingCart(id, product_id, newAmount);
        console.log(createResponse);
    }

    return (
        <div className={styles.layout}>
            <h1 className={styles.name}>{shoppingCart.name}</h1>
            <div className={styles.products}>
                <div className={styles.product}>
                    <p>Name</p>
                    <p>Price</p>
                    <p>Amount</p>
                    <p>Remove</p>
                    <p>Modify</p>
                </div>
                {products.length === 0 &&
                    <p>No products in this cart</p>
                }
                {products.length > 0 &&
                    products.map((product) => (
                        <div key={product.id} className={styles.product}>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <p>{product.CartProduct.quantity}</p>
                            <DeleteModal>
                                <Form
                                    buttonText={"Remove"}
                                    redirectTo={location.pathname}
                                    submitMethod={() => deleteProduct(product.id)}
                                    title={"Remove product " + product.name}>
                                </Form>
                            </DeleteModal>
                            <ModifyModal>
                                <Form
                                    buttonText={"Modify"}
                                    redirectTo={location.pathname}
                                    submitMethod={() => modifyProductAmount(product.id)}
                                    title={"Modify amount"}
                                >
                                    <QuantityInput
                                        min={1}
                                        onChange={(e) => setNewAmount(e.target.value)}
                                        value={newAmount}
                                        placeholder={1}
                                    />
                                </Form>
                            </ModifyModal>
                        </div>

                    ))
                }
            </div>
            {products.length > 0 &&
                <ModifyModal triggerText={"Buy cart"}>
                    <Form
                        buttonText={"Buy"}
                        title={"Buy cart"}
                        submitMethod={() => modifyCart()}
                        redirectTo={location.pathname}
                    >
                    </Form>
                </ModifyModal>
            }
            <ModifyModal triggerText={"Modify cart name"}>
                <Form
                    buttonText={"Modify cart"}
                    title={"Modify cart name"}
                    submitMethod={() => modifyCart()}
                    redirectTo={location.pathname}
                >
                    <TextInput value={newName} onChange={(e) => setNewName(e.target.value)} />
                </Form>
            </ModifyModal>
            <Link className={styles.actions} to={`/home`}>Continue shopping</Link>
        </div>
    )
}
export default ShoppingCart;