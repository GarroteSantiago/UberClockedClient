import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './ProductCard.module.scss';

function ProductCard({product, index }) {
    return (
        <Link to={`/Product/${product.id}`} className={styles.card} key={product.id}>
            <img src={product.image} alt={product.alt} className={styles.productImage} />
            <div className={styles.productInfo}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productPrice}>${product.price}</p>
            </div>
        </Link>
    );
}

export default ProductCard;
