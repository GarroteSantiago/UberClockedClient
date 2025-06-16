import React, {useEffect, useState} from "react";
import styles from "./SingleVerticalCarousel.module.scss";
import VerticalCard from "../../../cards/vertical/VerticalCard.js";

function SingleVerticalCarousel({options, baseUrl}) {
    console.log(options);
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
        <div className={styles.verticalCarousel}>
            <p className={styles.arrow} onClick={() => scroll(-1)}>◀</p>
            <VerticalCard key={currentOption.id} redirectTo={baseUrl + currentOption.id} >
                <h4>{currentOption.name}</h4>
                <p>Last update: <br/> {currentOption.updatedAt?.slice(0,10)}</p>
            </VerticalCard>
            <p className={styles.arrow} onClick={() => scroll(1)}>▶</p>
        </div>
    )
}
export default SingleVerticalCarousel;