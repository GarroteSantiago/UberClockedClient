import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

function ProductCard({product, index }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.Product_id}`);
    };

    return (
        <div key={index} onClick={handleClick} className={styles.productCard} style={{ cursor: 'pointer' }}>
            <img src={product.image} alt={product.alt} className={styles.productImage} />
            <div className={styles.productInfo}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>{product.price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
