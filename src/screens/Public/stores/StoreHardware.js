import React, {useEffect, useState} from "react";
import styles from "./StoreHardware.module.scss";
import {readAllProducts} from "../../../api/product.js";
import ProductCarousel from "../../../components/store/productCarousel/ProductCarousel.jsx";
import ProductCard from "../../../components/store/productCard/ProductCard.jsx";
import {hasPermission} from "../../../utils/authorizationChecker.js";
import NavTextButton from "../../../components/buttons/textButtons/navTextButton/NavTextButton.js";

function StoreHardware() {
    const [products, setProducts] = useState([]);
    const isAdmin = hasPermission("admin");
    console.log('isAdmin', isAdmin);

    const saveProducts = async () => {
        const data = await readAllProducts();
        setProducts(await data.json())
    }

    useEffect( () => {
        saveProducts();
    },[])

    return (
        <>
            <ProductCarousel>
                {products.map((product, index) => (
                    <ProductCard product={product} />
                ))}
            </ProductCarousel>
            {isAdmin && (
                <div className={styles.adminOptions}>
                    <NavTextButton text="Add Product" route="/products" />
                    <NavTextButton text="Add Component" route="/components" />
                </div>
            )}
        </>
    )
}
export default StoreHardware;