import React, {useEffect, useState} from "react";
import styles from "./SmallSingleCarousel.module.scss";
import SmallVerticalCard from "../../../cards/vertical/small/SmallVerticalCard.js";

function SmallSingleCarousel({options}) {
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
            <div className={styles.verticalOptions}>
                <SmallVerticalCard key={currentOption.id} to={"/profile/shoppingCarts/" + currentOption.id} >
                    <h4>{currentOption.name}</h4>
                    <p>Last update: <br/> {currentOption.updatedAt?.slice(0,10)}</p>
                </SmallVerticalCard>
            </div>
            <p className={styles.arrow} onClick={() => scroll(1)}>▶</p>
        </div>
    )
}
export default SmallSingleCarousel;