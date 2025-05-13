import React, {useRef} from 'react';
import styles from './ProductCarousel.module.css';

function ProductCarousel({children}) {
    const productCardWidth = 200;
    const gap = 32;

    const sliderRef = useRef(null);

    const scroll = (direction) => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: direction === "left" ? -productCardWidth-gap : productCardWidth+gap,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <div className={styles.productCarousel}>
                <button className={styles.scrollButton} onClick={() => scroll("left")}>◀</button>
                <div className={styles.products} ref={sliderRef}>
                    {children}
                </div>
                <button className={styles.scrollButton} onClick={() => scroll("right")}>▶</button>
            </div>
        </>
    )
}
export default ProductCarousel;