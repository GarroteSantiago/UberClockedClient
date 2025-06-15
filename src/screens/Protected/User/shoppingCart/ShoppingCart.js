import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styles from "./ShoppingCart.module.scss";
import {readAllProductsInShoppingCart, readCartById} from "../../../../api/shoppingCart.js";

function ShoppingCart() {
    const [products, setProducts] = useState([]);
    const [shoppingCart, setShoppingCart] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const getShoppingCart = async () => {
            const response = await readCartById(id);
            setShoppingCart(response.data);
        }
        const getProducts = async () => {
            const response = await readAllProductsInShoppingCart(id);
            console.log("Products response:", response.data);
            setProducts(response.data);
        }
        getShoppingCart();
        getProducts();
    }, [id]);

    return (
        <>
            <h1 className={styles.name}>{shoppingCart.name}</h1>
            {products.length === 0 &&
                <p>No products</p>
            }
            {products.length > 0 &&
                products.map((product) => (
                    <div key={product.id}>
                        <p>{product.name}</p>
                    </div>
                ))
            }
            <Link to={`/home`}>Buy products</Link>
        </>
    )
}
export default ShoppingCart;