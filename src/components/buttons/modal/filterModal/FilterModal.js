import React from "react";
import styles from "./FilterModal.module.scss";
import moduleStyles from "../Modal.module.scss"
import Modal from "react-modal";



function FilterModal({children}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={styles.textButton}>
                Filter
            </button>

            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className={moduleStyles.modal}
                overlayClassName={moduleStyles.overlay}
            >

                {children}

            </Modal>
        </>
    )
}

export default FilterModal;