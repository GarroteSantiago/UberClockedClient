import React, { useEffect, useState } from "react";
import {
    createProduct,
    readAllProducts,
    updateProduct,
    deleteProduct
} from "../../../../api/product.js";
import DeleteModal from "../../../../components/buttons/modal/deleteModal/DeleteModal.js";
import ModifyModal from "../../../../components/buttons/modal/modifyModal/ModifyModal.js";
import AddModal from "../../../../components/buttons/modal/addModal/AddModal.js";
import Form from "../../../../components/data/forms/Form.js";
import TextInput from "../../../../components/data/inputs/text/TextInput.js";
import QuantityInput from "../../../../components/data/inputs/quantity/QuantityInput.js";
import Table from "../../../../components/table/Table.js";
import { readAllComponents } from "../../../../api/component.js";
import DropDownInput from "../../../../components/data/inputs/dropDown/DropDownInput.js";

function Products() {
    const [products, setProducts] = useState([]);
    const [components, setComponents] = useState([]);

    // Estados para creación de producto
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newImageAlt, setNewImageAlt] = useState('');
    const [newComponentId, setNewComponentId] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const [newRating, setNewRating] = useState('');

    // Estados para edición de productos (mapa id -> valor)
    const [editNames, setEditNames] = useState({});
    const [editDescriptions, setEditDescriptions] = useState({});
    const [editImageUrls, setEditImageUrls] = useState({});
    const [editImageAlts, setEditImageAlts] = useState({});
    const [editComponentIds, setEditComponentIds] = useState({});
    const [editPrices, setEditPrices] = useState({});
    const [editRatings, setEditRatings] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await readAllProducts();
            setProducts(response.data);

            // Inicializar estados de edición con datos existentes
            const names = {};
            const descriptions = {};
            const imageUrls = {};
            const imageAlts = {};
            const componentIds = {};
            const prices = {};
            const ratings = {};

            response.data.forEach(product => {
                names[product.id] = product.name;
                descriptions[product.id] = product.description;
                imageUrls[product.id] = product.image_url;
                imageAlts[product.id] = product.image_alt;
                componentIds[product.id] = product.component_id;
                prices[product.id] = product.price;
                ratings[product.id] = product.rating;
            });

            setEditNames(names);
            setEditDescriptions(descriptions);
            setEditImageUrls(imageUrls);
            setEditImageAlts(imageAlts);
            setEditComponentIds(componentIds);
            setEditPrices(prices);
            setEditRatings(ratings);
        };

        const fetchComponents = async () => {
            const response = await readAllComponents();
            setComponents(response.data);
        };

        fetchProducts();
        fetchComponents();
    }, []);

    const handleCreate = async () => {
        const newProductData = {
            name: newName,
            description: newDescription,
            image_url: newImageUrl,
            image_alt: newImageAlt,
            component_id: parseInt(newComponentId),
            price: parseFloat(newPrice),
            rating: parseFloat(newRating || 0)
        };

        if (
            !newProductData.name ||
            !newProductData.description ||
            !newProductData.component_id ||
            isNaN(newProductData.price)
        ) {
            console.log("Missing required fields.");
            return;
        }

        await createProduct(newProductData);
        const response = await readAllProducts();
        setProducts(response.data);

        // Limpiar formulario
        setNewName('');
        setNewDescription('');
        setNewImageUrl('');
        setNewImageAlt('');
        setNewComponentId(null);
        setNewPrice('');
        setNewRating('');
    };

    const handleUpdate = async (id) => {
        const updatedProductData = {
            name: editNames[id],
            description: editDescriptions[id],
            image_url: editImageUrls[id],
            image_alt: editImageAlts[id],
            component_id: parseInt(editComponentIds[id]),
            price: parseFloat(editPrices[id]),
            rating: parseFloat(editRatings[id] || 0)
        };

        await updateProduct(id, updatedProductData);
        const response = await readAllProducts();
        setProducts(response.data);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        const response = await readAllProducts();
        setProducts(response.data);
    };

    const headers = [
        "Id",
        "Name",
        "Description",
        "Image URL",
        "Image Alt",
        "Price",
        "Delete",
        "Modify"
    ];

    const renderRow = (product) => {
        const id = product.id;

        const deleteForm = (
            <Form
                title="Delete"
                redirectTo="/admin/products"
                submitMethod={() => handleDelete(id)}
                buttonText="Delete"
            />
        );

        const modifyForm = (
            <Form
                title="Modify"
                redirectTo="/admin/products"
                submitMethod={() => handleUpdate(id)}
                buttonText="Modify"
            >
                <TextInput
                    value={editNames[id] || ""}
                    onChange={(e) => setEditNames(prev => ({ ...prev, [id]: e.target.value }))}
                    placeholder="New name"
                />
                <TextInput
                    value={editDescriptions[id] || ""}
                    onChange={(e) => setEditDescriptions(prev => ({ ...prev, [id]: e.target.value }))}
                    placeholder="New description"
                />
                <TextInput
                    value={editImageUrls[id] || ""}
                    onChange={(e) => setEditImageUrls(prev => ({ ...prev, [id]: e.target.value }))}
                    placeholder="New image URL"
                />
                <TextInput
                    value={editImageAlts[id] || ""}
                    onChange={(e) => setEditImageAlts(prev => ({ ...prev, [id]: e.target.value }))}
                    placeholder="New image alt"
                />
                <DropDownInput
                    placeholderText={"Select component"}
                    options={components.map((c) => ({ id: c.id, label: c.name }))}
                    name="component"
                    selected={editComponentIds[id] || null}
                    onChange={(e) => setEditComponentIds(prev => ({ ...prev, [id]: e }))}
                />
                <QuantityInput
                    value={editPrices[id] || ""}
                    onChange={(e) => setEditPrices(prev => ({ ...prev, [id]: e.target.value }))}
                    placeholder="New price"
                />
            </Form>
        );

        return (
            <>
                <p>{id}</p>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.image_url}</p>
                <p>{product.image_alt}</p>
                <p>{product.price}</p>
                <p><DeleteModal>{deleteForm}</DeleteModal></p>
                <p><ModifyModal>{modifyForm}</ModifyModal></p>
            </>
        );
    };

    const addProductForm = (
        <Form
            title="Create"
            submitMethod={handleCreate}
            redirectTo="/admin/products"
            buttonText="Create"
        >
            <TextInput
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Product Name"
            />
            <TextInput
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Product Description"
            />
            <TextInput
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Image URL"
            />
            <TextInput
                value={newImageAlt}
                onChange={(e) => setNewImageAlt(e.target.value)}
                placeholder="Image Alt"
            />
            <DropDownInput
                placeholderText={"Select component"}
                options={components.map((c) => ({ id: c.id, label: c.name }))}
                name="component"
                selected={newComponentId}
                onChange={(e) => setNewComponentId(e)}
            />
            <QuantityInput
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Price"
            />
        </Form>
    );

    return (
        <>
            <h1>Products</h1>
            <Table headers={headers} rows={products} renderRow={renderRow} />
            <AddModal>{addProductForm}</AddModal>
        </>
    );
}

export default Products;
