import React, {useState} from "react";
import styles from "./Form.module.scss";
import {useNavigate} from "react-router-dom";
import SubmitButton from "../../buttons/formButtons/submitButton/SubmitButton.js";

function Form({ children, title, submitMethod, redirectTo, buttonText ="Sign Up" }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Extract plain data from the form
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            await submitMethod(data);
            if (redirectTo === window.location.pathname) {
                window.location.reload();
            }else {
                navigate(redirectTo);
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Submission failed.');
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>{title}</h2>
            {error && (<p className={styles.error}>{error}</p>)}
            <form className={styles.form} onSubmit={handleSubmit} >
                {children}
                <SubmitButton text={buttonText} />
            </form>
        </div>
    )
}
export default Form;