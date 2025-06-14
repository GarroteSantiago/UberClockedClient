import React, { useEffect, useState } from "react";
import {
    createUser,
    readAllUsers,
    updateUser,
    deleteUser
} from "../../../../api/user/user.js";
import DeleteModal from "../../../../components/buttons/modal/deleteModal/DeleteModal.js";
import ModifyModal from "../../../../components/buttons/modal/modifyModal/ModifyModal.js";
import AddModal from "../../../../components/buttons/modal/addModal/AddModal.js";
import Form from "../../../../components/data/forms/Form.js";
import TextInput from "../../../../components/data/inputs/textInput/TextInput.js";
import EmailInput from "../../../../components/data/inputs/emailInput/EmailInput.js"; // Import EmailInput
import styles from "./Users.module.scss";

function Users() {
    const [users, setUsers] = useState([]);
    const [formStates, setFormStates] = useState({});

    useEffect(() => {
        const loadUsers = async () => {
            const response = await readAllUsers();
            setUsers(response.data);

            const initialStates = {};
            response.data.forEach((user) => {
                initialStates[user.id] = {
                    role_id: user.role_id,
                    name: user.name,
                    name_tag: user.name_tag,
                    email: user.email,
                    ubication: user.ubication,
                    postal_code: user.postal_code
                };
            });
            setFormStates(initialStates);
        };

        loadUsers();
    }, []);

    const handleInputChange = (id, field, value) => {
        setFormStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const handleUpdate = async (id) => {
        await updateUser(id, formStates[id]);
        const response = await readAllUsers();
        setUsers(response.data);
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        const response = await readAllUsers();
        setUsers(response.data);
    };

    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <p className={styles.headerCell}>ID</p>
                <p className={styles.headerCell}>Role ID</p>
                <p className={styles.headerCell}>Name</p>
                <p className={styles.headerCell}>Name Tag</p>
                <p className={styles.headerCell}>Email</p>
                <p className={styles.headerCell}>Ubication</p>
                <p className={styles.headerCell}>Postal Code</p>
                <p className={styles.headerCell}>Delete</p>
                <p className={styles.headerCell}>Modify</p>
            </div>
            <div className={styles.tableBody}>
                {users.map(user => {
                    const { id } = user;
                    const form = formStates[id];
                    if (!form) return null;

                    const modifyForm = (
                        <Form
                            title="Modify User"
                            redirectTo="/users"
                            submitMethod={() => handleUpdate(id)}
                            buttonText="Modify"
                        >
                            {["role_id", "name", "ubication", "postal_code"].map(field => {
                                const InputComponent = field === "email" ? EmailInput : TextInput;
                                return (
                                    <InputComponent
                                        key={field}
                                        value={form[field]}
                                        onChange={(e) => handleInputChange(id, field, e.target.value)}
                                        placeholder={`New ${field.replace("_", " ")}`}
                                    />
                                );
                            })}
                        </Form>
                    );

                    const deleteForm = (
                        <Form
                            title="Delete User"
                            redirectTo="/users"
                            submitMethod={() => handleDelete(id)}
                            buttonText="Delete"
                        />
                    );

                    return (
                        <div className={styles.element} key={id}>
                            <p className={styles.cell}>{id}</p>
                            <p className={styles.cell}>{user.role_id}</p>
                            <p className={styles.cell}>{user.name}</p>
                            <p className={styles.cell}>{user.name_tag}</p>
                            <p className={styles.cell}>{user.email}</p>
                            <p className={styles.cell}>{user.ubication}</p>
                            <p className={styles.cell}>{user.postal_code}</p>
                            <p className={styles.cell}><DeleteModal>{deleteForm}</DeleteModal></p>
                            <p className={styles.cell}><ModifyModal>{modifyForm}</ModifyModal></p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Users;
