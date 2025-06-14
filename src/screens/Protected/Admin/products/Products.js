import React, { useEffect, useState } from "react";
import { createProduct, readAllProducts, updateProduct, deleteProduct } from "../../../../api/product.js";
import DeleteModal from "../../../../components/buttons/modal/deleteModal/DeleteModal.js";
import ModifyModal from "../../../../components/buttons/modal/modifyModal/ModifyModal.js";
import Form from "../../../../components/data/forms/Form.js";
import TextInput from "../../../../components/data/inputs/textInput/TextInput.js";
import AddModal from "../../../../components/buttons/modal/addModal/AddModal.js";
import styles from "./Products.module.scss";
import QuantityInput from "../../../../components/data/inputs/numberInput/NumberInput.js";

function Products() {
    const [products, setProducts] = useState([]);
    const [formStates, setFormStates] = useState({});

    useEffect(() => {
        const saveProducts = async () => {
            const response = await readAllProducts();
            setProducts(response.data);
            const initialFormStates = {};
            response.data.forEach((product) => {
                initialFormStates[product.id] = {
                    name: product.name,
                    description: product.description,
                    image_url: product.image_url,
                    image_alt: product.image_alt,
                    component_id: product.component_id,
                    price: product.price,
                    rating: product.rating
                };
            });
            setFormStates(initialFormStates);
        };

        saveProducts();
    }, []);

    const handleInputChange = (id, field, value) => {
        setFormStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const handleCreate = async () => {
        const newProductData = {
            name: formStates.newProduct?.name,
            description: formStates.newProduct?.description,
            image_url: formStates.newProduct?.image_url,
            image_alt: formStates.newProduct?.image_alt,
            component_id: parseInt(formStates.newProduct?.component_id, 10),
            price: parseFloat(formStates.newProduct?.price),
            rating: parseFloat(formStates.newProduct?.rating || 0)
        };

        if (!newProductData.name || !newProductData.description || !newProductData.component_id || isNaN(newProductData.price)) {
            console.log("Name, Description, Component ID, and Price are required.");
            return;
        }

        await createProduct(newProductData);
        const response = await readAllProducts();
        setProducts(response.data);
    };

    const handleUpdate = async (id) => {
        const { name, description, image_url, image_alt, component_id, price } = formStates[id];
        await updateProduct(id, { name, description, image_url, image_alt, component_id, price});
    };


    const handleDelete = async (id) => {
        await deleteProduct(id);
    };

    const addProductForm = (
        <Form
            title="Create"
            submitMethod={handleCreate}
            redirectTo="/products"
            buttonText="Create"
        >
            <TextInput
                value={formStates.newProduct?.name || ''}
                onChange={(e) => handleInputChange('newProduct', 'name', e.target.value)}
                placeholder="Product Name"
            />
            <TextInput
                value={formStates.newProduct?.description || ''}
                onChange={(e) => handleInputChange('newProduct', 'description', e.target.value)}
                placeholder="Product Description"
            />
            <TextInput
                value={formStates.newProduct?.image_url || ''}
                onChange={(e) => handleInputChange('newProduct', 'image_url', e.target.value)}
                placeholder="Image URL"
            />
            <TextInput
                value={formStates.newProduct?.image_alt || ''}
                onChange={(e) => handleInputChange('newProduct', 'image_alt', e.target.value)}
                placeholder="Image Alt"
            />
            <QuantityInput
                value={formStates.newProduct?.component_id || ''}
                onChange={(e) => handleInputChange('newProduct', 'component_id', e.target.value)}
                placeholder="Component ID"
            />
            <QuantityInput
                value={formStates.newProduct?.price || ''}
                onChange={(e) => handleInputChange('newProduct', 'price', e.target.value)}
                placeholder="Price"
            />

        </Form>
    );

    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <p className={styles.headerCell}>Id</p>
                <p className={styles.headerCell}>Name</p>
                <p className={styles.headerCell}>Description</p>
                <p className={styles.headerCell}>Image url</p>
                <p className={styles.headerCell}>Image alt</p>
                <p className={styles.headerCell}>Price</p>
                <p className={styles.headerCell}>Delete</p>
                <p className={styles.headerCell}>Modify</p>
            </div>
            <div className={styles.tableBody}>
                {products.map((product) => {
                    const { id } = product;
                    const form = formStates[id];

                    if (!form) return null;

                    const modifyForm = (
                        <Form
                            title="Modify"
                            redirectTo="/products"
                            submitMethod={() => handleUpdate(id)}
                            buttonText="Modify"
                        >
                            <TextInput
                                value={form.name}
                                onChange={(e) => handleInputChange(id, 'name', e.target.value)}
                                placeholder="New name"
                            />
                            <TextInput
                                value={form.description}
                                onChange={(e) => handleInputChange(id, 'description', e.target.value)}
                                placeholder="New description"
                            />
                            <TextInput
                                value={form.image_url}
                                onChange={(e) => handleInputChange(id, 'image_url', e.target.value)}
                                placeholder="New image URL"
                            />
                            <TextInput
                                value={form.image_alt}
                                onChange={(e) => handleInputChange(id, 'image_alt', e.target.value)}
                                placeholder="New image alt"
                            />
                            <QuantityInput
                                value={form.component_id}
                                onChange={(e) => handleInputChange(id, 'component_id', e.target.value)}
                                placeholder="New component ID"
                            />
                            <QuantityInput
                                value={form.price}
                                onChange={(e) => handleInputChange(id, 'price', e.target.value)}
                                placeholder="New price"
                            />
                        </Form>
                    );


                    const deleteForm = (
                        <Form
                            title="Delete"
                            redirectTo="/products"
                            submitMethod={() => handleDelete(id)}
                            buttonText="Delete"
                        />
                    );

                    return (
                        <div className={styles.element} key={id}>
                            <p className={styles.cell}>{id}</p>
                            <p className={styles.cell}>{product.name}</p>
                            <p className={styles.cell}>{product.description}</p>
                            <p className={styles.cell}>{product.image_url}</p>
                            <p className={styles.cell}>{product.image_alt}</p>
                            <p className={styles.cell}>{product.price}</p>
                            <p className={styles.cell}><DeleteModal>{deleteForm}</DeleteModal></p>
                            <p className={styles.cell}><ModifyModal>{modifyForm}</ModifyModal></p>
                        </div>
                    );
                })}
            </div>
            <AddModal>{addProductForm}</AddModal>
        </div>
    );
}

export default Products;
