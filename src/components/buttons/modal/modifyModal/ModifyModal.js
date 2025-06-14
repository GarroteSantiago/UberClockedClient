import React from "react";
import styles from "./ModifyModal.module.scss";
import Modal from "react-modal";

function ModifyModal({children}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={styles.textButton}>
                Modify
            </button>

            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className={styles.modal}
            >
                {children}
            </Modal>
        </>
    )
}

export default ModifyModal;