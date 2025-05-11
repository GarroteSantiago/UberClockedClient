import React from "react";
import styles from "./AddModalTrigger.module.scss";
import Modal from "react-modal";



function AddModalTrigger({children, elementType = "placeholder"}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={styles.textButton}>
                Add {elementType}
            </button>

            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >

                {children}

            </Modal>
        </>
    )
}

export default AddModalTrigger;