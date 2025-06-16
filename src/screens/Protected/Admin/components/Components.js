import React, { useEffect, useState } from "react";
import { createComponent, readAllComponents, updateComponent, deleteComponent } from "../../../../api/component.js";
import DeleteModal from "../../../../components/buttons/modal/deleteModal/DeleteModal.js";
import ModifyModal from "../../../../components/buttons/modal/modifyModal/ModifyModal.js";
import Form from "../../../../components/data/forms/Form.js";
import TextInput from "../../../../components/data/inputs/text/TextInput.js";
import AddModal from "../../../../components/buttons/modal/addModal/AddModal.js";
import Table from "../../../../components/table/Table.js";

function Components() {
    const [components, setComponents] = useState([]);
    const [formStates, setFormStates] = useState({});

    useEffect(() => {
        const saveComponents = async () => {
            const response = await readAllComponents();
            setComponents(response.data);
            const initialFormStates = {};
            response.data.forEach((component) => {
                initialFormStates[component.id] = {
                    name: component.name,
                    description: component.description
                };
            });
            setFormStates(initialFormStates);
        };

        saveComponents();
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

    const handleCreate = async () => {
        const newComponentData = {
            name: formStates.newComponent?.name,
            description: formStates.newComponent?.description
        };

        if (!newComponentData.name || !newComponentData.description) {
            console.log("Name and Description are required.");
            return;
        }

        await createComponent(newComponentData);
        const response = await readAllComponents();
        setComponents(response.data);
    };

    const handleUpdate = async (id) => {
        const { name, description } = formStates[id];
        await updateComponent(id, { name, description });
    };

    const handleDelete = async (id) => {
        await deleteComponent(id);
        const response = await readAllComponents();
        setComponents(response.data);
    };

    const addComponentForm = (
        <Form
            title="Create"
            submitMethod={handleCreate}
            redirectTo="/admin/components"
            buttonText="Create"
        >
            <TextInput
                value={formStates.newComponent?.name || ''}
                onChange={(e) => handleInputChange('newComponent', 'name', e.target.value)}
                placeholder="Component Name"
            />
            <TextInput
                value={formStates.newComponent?.description || ''}
                onChange={(e) => handleInputChange('newComponent', 'description', e.target.value)}
                placeholder="Component Description"
            />
        </Form>
    );

    const headers = ["Id", "Name", "Description", "Delete", "Modify"];

    const renderRow = (component) => {
        const { id } = component;
        const form = formStates[id];
        if (!form) return null;

        const modifyForm = (
            <Form
                title="Modify"
                redirectTo="/admin/components"
                submitMethod={() => handleUpdate(id)}
                buttonText="Modify"
            >
                <TextInput
                    value={form.name}
                    onChange={(e) => handleInputChange(id, 'name', e.target.value)}
                    placeholder="New name"
                />
                <TextInput
                    value={form.description}
                    onChange={(e) => handleInputChange(id, 'description', e.target.value)}
                    placeholder="New description"
                />
            </Form>
        );

        const deleteForm = (
            <Form
                title="Delete"
                redirectTo="/admin/components"
                submitMethod={() => handleDelete(id)}
                buttonText="Delete"
            />
        );

        return (
            <>
                <p>{id}</p>
                <p>{component.name}</p>
                <p>{component.description}</p>
                <p><DeleteModal>{deleteForm}</DeleteModal></p>
                <p><ModifyModal>{modifyForm}</ModifyModal></p>
            </>
        );
    };

    return (
        <>
            <h1>Components</h1>
            <Table headers={headers} rows={components} renderRow={renderRow} />
            <AddModal>{addComponentForm}</AddModal>
        </>
    );
}

export default Components;
