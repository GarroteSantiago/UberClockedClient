import React, { useEffect, useState } from "react";
import styles from "./StoreHardware.module.scss";
import { readAllProducts } from "../../../api/product.js";
import ProductCarousel from "../../../components/store/productCarousel/ProductCarousel.jsx";
import ProductCard from "../../../components/store/productCard/ProductCard.jsx";
import { hasPermission } from "../../../utils/authorizationChecker.js";
import NavTextButton from "../../../components/buttons/textButtons/navTextButton/NavTextButton.js";

function StoreHardware() {
    const [products, setProducts] = useState([]);
    const [filterComponentId, setFilterComponentId] = useState(""); // 🔹 Filtering by component_id
    const isAdmin = hasPermission("admin");

    useEffect(() => {
        const saveProducts = async () => {
            const response = await readAllProducts();
            setProducts(response.data);
        };

        saveProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        filterComponentId === "" || String(product.component_id) === filterComponentId
    );

    return (
        <>
            <div className={styles.filterContainer}>
                <input
                    type="text"
                    placeholder="Filter by component_id"
                    value={filterComponentId}
                    onChange={(e) => setFilterComponentId(e.target.value)}
                    className={styles.filterInput}
                />
            </div>

            <ProductCarousel>
                {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} index={index} product={product} />
                ))}
            </ProductCarousel>

            {isAdmin && (
                <div className={styles.adminOptions}>
                    <NavTextButton text="Add Product" route="/products" />
                    <NavTextButton text="Add Component" route="/components" />
                </div>
            )}
        </>
    );
}

export default StoreHardware;
