import React from "react";
import styles from "./DeleteModal.module.scss";
import moduleStyles from "../Modal.module.scss"
import Modal from "react-modal";



function DeleteModal({children, triggerText ="Delete"}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={styles.textButton}>
                {triggerText}
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

export default DeleteModal;