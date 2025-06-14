import React, { useState } from 'react';
import styles from './ProductCarousel.module.scss';

function ProductCarousel({ children }) {
    const totalItems = React.Children.count(children);
    console.log(totalItems);
    const visibleCount = 12; // 6 columns × 2 rows
    const [startIndex, setStartIndex] = useState(0);

    const getVisibleChildren = () => {
        return React.Children.toArray(children).slice(startIndex, startIndex + visibleCount);
    };

    const scrollRight = () => {
        if (startIndex + visibleCount < totalItems) {
            setStartIndex(startIndex + 1);
        } else {
            // Optional: wrap around
            setStartIndex(0);
        }
    };

    const scrollLeft = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        } else {
            setStartIndex(totalItems - visibleCount);
        }
    };


    return (
        <div className={styles.productCarousel}>
            <button className={styles.scrollButton} onClick={scrollLeft}>◀</button>
            <div className={styles.products}>
                {getVisibleChildren()}
            </div>
            <button className={styles.scrollButton} onClick={scrollRight}>▶</button>
        </div>
    );
}

export default ProductCarousel;
