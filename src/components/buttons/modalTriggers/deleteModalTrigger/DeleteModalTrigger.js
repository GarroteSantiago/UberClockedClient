import React from "react";
import styles from "./DeleteModalTrigger.module.scss";
import Modal from "react-modal";



function DeleteModalTrigger({children, elementType = "placeholder"}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={styles.textButton}>
                Delete {elementType}
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

export default DeleteModalTrigger;