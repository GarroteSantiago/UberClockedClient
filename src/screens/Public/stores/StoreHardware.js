import React, { useEffect, useState } from "react";
import styles from "./StoreHardware.module.scss";
import { readAllProducts } from "../../../api/product.js";
import ProductCarousel from "../../../components/store/productCarousel/ProductCarousel.jsx";
import ProductCard from "../../../components/store/productCard/ProductCard.jsx";
import { hasPermission } from "../../../utils/authorizationChecker.js";
import NavTextButton from "../../../components/buttons/textButtons/navTextButton/NavTextButton.js";
import FilterModal from "../../../components/buttons/modal/filterModal/FilterModal.js";
import TextInput from "../../../components/data/inputs/textInput/TextInput.js";
import Form from "../../../components/data/forms/Form.js";
import DropDownInput from "../../../components/data/inputs/dropDownInput/DropDownInput.js";
import RangeInput from "../../../components/data/inputs/rangeInput/RangeInput.js";
import {readAllComponents} from "../../../api/component.js";

function StoreHardware() {
    const [products, setProducts] = useState([]);
    const [components, setComponents] = useState([]);
    const [filterComponentId, setFilterComponentId] = useState(""); // 🔹 Filtering by component_id
    const isAdmin = hasPermission("admin");

    useEffect(() => {
        const saveProducts = async () => {
            const response = await readAllProducts();
            setProducts(response.data);
        };
        const saveComponents = async () => {
            const response = await readAllComponents();
            setComponents(response.data);
        }
        saveProducts();
        saveComponents();
    }, []);

    const filteredProducts =
        products.filter(product =>
            filterComponentId === "" || String(product.component_id) === filterComponentId
        )

    return (
        <>
            <div className={styles.filterContainer}>
                <FilterModal>
                    <Form buttonText="Filter" title="Add filter">
                        <div className={styles.filterInputs}>
                            <TextInput placeholder="Filter by comma separeted keywords" />
                            <DropDownInput
                                options={components.map(c => ({
                                    id: String(c.id),
                                    label: c.name,
                                }))}
                                onChange={(value) => setFilterComponentId(value)}
                                defaultSelected={filterComponentId}
                            />
                        </div>
                        <div className={styles.filterRanges}>
                            <RangeInput min={0} max={10000} step={10} option={"precios"}/>
                            <RangeInput min={0} max={5} step={0.5} defaultValues={[0,5]} option={"rating"}/>
                        </div>
                    </Form>
                </FilterModal>
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
