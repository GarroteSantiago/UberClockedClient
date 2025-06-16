import React, {useEffect, useState} from "react";
import styles from "./SingleHorizontalCarousel.module.scss";
import HorizontalCard from "../../../cards/horizontal/HorizontalCard.js";

function SingleHorizontalCarousel({options, baseUrl}) {
    const [currentOption, setCurrentOption] = useState({});

    useEffect(() => {
        if (options.length > 0) {
            setCurrentOption(options[0]);
        }
    },[options]);

    const scroll = (direction) => {
        const newIndex = options.indexOf(currentOption) + direction;
        if (newIndex >= 0 && newIndex < options.length) {
            setCurrentOption(options[newIndex]);
        }else if (newIndex >= 0) {
            setCurrentOption(options[newIndex-options.length]);
        } else {
            setCurrentOption(options[options.length + newIndex]);
        }
    }

    return(
        <div className={styles.horizontalCarousel}>
            <p className={styles.arrow} onClick={() => scroll(-1)}>◀</p>
            <HorizontalCard key={currentOption.id} redirectTo={baseUrl + currentOption.id} >
                <h4>{currentOption.name}</h4>
            </HorizontalCard>
            <p className={styles.arrow} onClick={() => scroll(1)}>▶</p>
        </div>
    )
}
export default SingleHorizontalCarousel;