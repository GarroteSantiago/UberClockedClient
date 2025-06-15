import React from "react";
import styles from "./AddModal.module.scss";
import moduleStyles from "../Modal.module.scss"
import Modal from "react-modal";



function AddModal({children, text="Add"}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={styles.textButton}>
                {text}
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

export default AddModal;