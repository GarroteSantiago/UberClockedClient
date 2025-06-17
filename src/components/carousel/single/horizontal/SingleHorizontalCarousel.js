import React, {useEffect, useState} from "react";
import styles from "./SingleHorizontalCarousel.module.scss";
import HorizontalCard from "../../../cards/horizontal/HorizontalCard.js";
import DeleteModal from "../../../buttons/modal/deleteModal/DeleteModal.js";
import Form from "../../../data/forms/Form.js";
import {deleteReviewById} from "../../../../api/reviews.js";

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
        <>
            <div className={styles.horizontalCarousel}>
                <p className={styles.arrow} onClick={() => scroll(-1)}>◀</p>
                <HorizontalCard key={currentOption.id} redirectTo={baseUrl + currentOption.id} >
                    <h4>{window.location.pathname === "/profile" ? currentOption.Product?.name : currentOption.User?.name_tag}</h4>
                    <p>{currentOption.comment}</p>
                    <p>{currentOption.rating}</p>
                </HorizontalCard>
                <p className={styles.arrow} onClick={() => scroll(1)}>▶</p>
            </div>
            <DeleteModal>
                <Form title={"Delete review"} redirectTo={window.location.pathname} submitMethod={() => deleteReviewById(currentOption.id)} buttonText={"Delete"} />
            </DeleteModal>
        </>
    )
}
export default SingleHorizontalCarousel;