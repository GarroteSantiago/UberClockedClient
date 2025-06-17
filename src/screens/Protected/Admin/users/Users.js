import React, { useEffect, useState } from "react";
import {
    readAllUsers,
    updateUser,
    deleteUser
} from "../../../../api/user/user.js";
import DeleteModal from "../../../../components/buttons/modal/deleteModal/DeleteModal.js";
import ModifyModal from "../../../../components/buttons/modal/modifyModal/ModifyModal.js";
import AddModal from "../../../../components/buttons/modal/addModal/AddModal.js";
import Form from "../../../../components/data/forms/Form.js";
import TextInput from "../../../../components/data/inputs/text/TextInput.js";
import EmailInput from "../../../../components/data/inputs/email/EmailInput.js";
import styles from "./Users.module.scss";
import Table from "../../../../components/table/Table.js";

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

    const headers = [
        "ID", "Role", "Name", "Name Tag", "Email", "Ubication", "Postal Code", "Delete", "Modify"
    ];

    const renderRow = (user) => {
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
                {["role", "name", "ubication", "postal_code"].map(field => {
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
            <>
                <p>{id}</p>
                <p>{user.Role.name}</p>
                <p>{user.name}</p>
                <p>{user.name_tag}</p>
                <p>{user.email}</p>
                <p>{user.ubication}</p>
                <p>{user.postal_code}</p>
                <p><DeleteModal>{deleteForm}</DeleteModal></p>
                <p><ModifyModal>{modifyForm}</ModifyModal></p>
            </>
        );
    };

    return (
        <div className={styles.users}>
            <Table headers={headers} rows={users} renderRow={renderRow} />
        </div>
    );
}

export default Users;
