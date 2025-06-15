import React, { useEffect, useState } from "react";
import styles from "./StoreHardware.module.scss";
import { readAllProducts } from "../../../api/product.js";
import ProductCarousel from "../../../components/carousel/product/ProductCarousel.jsx";
import ProductCard from "../../../components/cards/product/ProductCard.jsx";
import { hasPermission } from "../../../utils/authorizationChecker.js";
import NavTextButton from "../../../components/buttons/textButtons/navTextButton/NavTextButton.js";
import FilterModal from "../../../components/buttons/modal/filterModal/FilterModal.js";
import TextInput from "../../../components/data/inputs/text/TextInput.js";
import Form from "../../../components/data/forms/Form.js";
import DropDownInput from "../../../components/data/inputs/dropDown/DropDownInput.js";
import RangeInput from "../../../components/data/inputs/range/RangeInput.js";
import {readAllComponents} from "../../../api/component.js";

function StoreHardware() {
    const [products, setProducts] = useState([]);
    const [components, setComponents] = useState([]);
    const [filterComponentId, setFilterComponentId] = useState("");
    const [keywords, setKeywords] = useState("");
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [ratingRange, setRatingRange] = useState([0, 5]);
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

    const filteredProducts = products.filter(product => {
        // Filtro por componente
        const matchesComponent = filterComponentId === "" || String(product.component_id) === filterComponentId;

        // Filtro por palabras clave
        const keywordsArray = keywords.split(",").map(kw => kw.trim().toLowerCase()).filter(Boolean);
        const matchesKeywords = keywordsArray.length === 0 || keywordsArray.some(kw =>
            product.name.toLowerCase().includes(kw) ||
            product.description?.toLowerCase().includes(kw)
        );

        // Filtro por precio
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

        // Filtro por rating
        const matchesRating = product.rating >= ratingRange[0] && product.rating <= ratingRange[1];

        return matchesComponent && matchesKeywords && matchesPrice && matchesRating;
    });


    return (
        <>
            <div className={styles.filterContainer}>
                <FilterModal handleReset={() => {
                    setKeywords("");
                    setFilterComponentId("");
                    setPriceRange([0, 10000]);
                    setRatingRange([0, 5]);
                }}>
                    <div className={styles.filterInputs}>
                        <TextInput
                            placeholder="KeyWord1,KeyWord2"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />

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
                        <RangeInput
                            min={0}
                            max={10000}
                            step={100}
                            option={"precios"}
                            defaultValues={priceRange}
                            onChange={(values) => setPriceRange(values)}
                        />
                        <RangeInput
                            min={0}
                            max={5}
                            step={0.5}
                            option={"rating"}
                            defaultValues={ratingRange}
                            onChange={(values) => setRatingRange(values)}
                        />

                    </div>
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
