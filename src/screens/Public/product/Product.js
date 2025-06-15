import React from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import styles from "./Product.module.scss";
import {readAllProducts, readProductById} from "../../../api/product.js";
import {createProductInShoppingCart, readAllShoppingCartsOfUser} from "../../../api/shoppingCart.js";
import {readComponentById} from "../../../api/component.js";
import ProductCard from "../../../components/cards/product/ProductCard.jsx";
import AddModal from "../../../components/buttons/modal/addModal/AddModal.js";
import Form from "../../../components/data/forms/Form.js";
import DropDownInput from "../../../components/data/inputs/dropDownInput/DropDownInput.js";
import NumberInput from "../../../components/data/inputs/numberInput/NumberInput.js";

function Product() {
    const [product, setProduct] = React.useState({});
    const [component, setComponent] = React.useState({});
    const [amount, setAmount] = React.useState("");
    const [cart, setCart] = React.useState(0);
    const [carts, setCarts] = React.useState([]);
    const [otherProducts, setOtherProducts] = React.useState([]);
    const {id} = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const response = await readProductById(id);
            setProduct(response.data);
        }
        const getCarts = async () => {
            const response = await readAllShoppingCartsOfUser();
            setCarts(response.data);
        }
        getProduct();
        getCarts();
    }, [id])
    useEffect(() => {
        const getComponent = async () => {
            if (!product.component_id) return;
            const response = await readComponentById(product.component_id);
            setComponent(response.data);
        }
        const getOtherProducts = async () => {
            const response = await readAllProducts();
            setOtherProducts(response.data);
        }
        getComponent();
        getOtherProducts();
    },[product.component_id]);
    return (
        <div className={styles.layout}>
            <div className={styles.principal}>
                <div className={styles.presentation}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <img className={styles.image} src={product.image_url} alt={product.image_alt} />
                </div>
                <div className={styles.information}>
                    <h2>{component.name}</h2>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.data}>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating}</p>
                    </div>
                    <AddModal text={"Add to cart"}>
                        <Form
                            buttonText={"Add Product to cart"}
                            title={"Add new product"}
                            submitMethod={() => createProductInShoppingCart(cart, product.id, amount)}
                            redirectTo={"/home"}
                        >
                            <DropDownInput
                                options={carts.map(c => ({
                                    id: String(c.id),
                                    label: c.name,
                                }))}
                                onChange={(value) => setCart(value)}

                            />
                            <NumberInput value={amount} min={1} onChange={(e)=>setAmount(e.target.value)}  />
                        </Form>
                    </AddModal>
                </div>
            </div>
            <div className={styles.secondary}>
                <h2>Similar products</h2>
                <div className={styles.otherOptions}>
                    {otherProducts.map((product) => (
                        <ProductCard product={product} index={product.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Product;