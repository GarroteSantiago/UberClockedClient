import React from "react";
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import styles from "./Product.module.scss";
import {readAllProducts, readProductById} from "../../../api/product.js";
import {createProductInShoppingCart, readAllShoppingCartsOfUser} from "../../../api/shoppingCart.js";
import {readComponentById} from "../../../api/component.js";
import ProductCard from "../../../components/cards/product/ProductCard.jsx";
import AddModal from "../../../components/buttons/modal/addModal/AddModal.js";
import Form from "../../../components/data/forms/Form.js";
import DropDownInput from "../../../components/data/inputs/dropDown/DropDownInput.js";
import NumberInput from "../../../components/data/inputs/quantity/QuantityInput.js";
import QuantityInput from "../../../components/data/inputs/quantity/QuantityInput.js";
import {createReview, readReviewsByProductId} from "../../../api/reviews.js";
import TextInput from "../../../components/data/inputs/text/TextInput.js";
import SingleHorizontalCarousel from "../../../components/carousel/single/horizontal/SingleHorizontalCarousel.js";

function Product() {
    const [product, setProduct] = React.useState({});
    const [component, setComponent] = React.useState({});
    const [amount, setAmount] = React.useState("");
    const [cart, setCart] = React.useState(0);
    const [carts, setCarts] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [textReview, setTextReview] = React.useState([]);
    const [numericReview, setNumericReview] = React.useState([]);
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
        const getReviews = async () => {
            const response = await readReviewsByProductId(id);
            setReviews(response.data);
        }
        getProduct();
        getCarts();
        getReviews();
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

    const writeReview = async () => {
        await createReview(id, textReview, numericReview);
    }
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
                    {carts.length > 0 && (

                        <AddModal text={"Add to carts"}>
                            <Form
                                buttonText={"Add Product to carts"}
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
                                <QuantityInput value={amount} min={1} onChange={(e)=>setAmount(e.target.value)}  />
                            </Form>
                        </AddModal>
                    )}
                    {carts.length === 0 && (
                        <Link to="/profile/ShoppingCarts">Create cart to add</Link>
                    )}
                    <AddModal text={"Add review"}>
                        <Form
                            buttonText={"Add review"}
                            redirectTo={window.location.pathname}
                            submitMethod={() => writeReview()}
                            title={"Add review"}
                        >
                            <TextInput maxLength={200} onChange={(e)=>setTextReview(e.target.value)} value={textReview} placeholder={"Text Review"} />
                            <QuantityInput min={0} max={5} value={numericReview} onChange={(e)=>setNumericReview(e.target.value)} placeholder={0} />
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
            <div className={styles.otherReviews}>
                <h2>Other reviews</h2>
                <SingleHorizontalCarousel options={reviews} />
            </div>
        </div>
    )
}
export default Product;