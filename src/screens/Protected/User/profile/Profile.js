import React, {useEffect, useState} from "react";
import styles from "./Profile.module.scss";
import Form from "../../../../components/data/forms/Form.js";
import EmailInput from "../../../../components/data/inputs/email/EmailInput.js";
import TextInput from "../../../../components/data/inputs/text/TextInput.js";
import {readMe, updateMe} from "../../../../api/user/user.js";
import ModifyModal from "../../../../components/buttons/modal/modifyModal/ModifyModal.js";
import UbicationInput from "../../../../components/data/inputs/ubication/UbicationInput.js";
import {readAllCountries} from "../../../../api/ubication/country.js";
import {readAllProvinces} from "../../../../api/ubication/province.js";
import {readAllLocalities} from "../../../../api/ubication/locality.js";

function Profile(){
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [nameTag, setNameTag] = useState("");
    const [ubication, setUbication] = useState({country_id:"", province_id:"", locality_id:""});
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [localities, setLocalities] = useState({});
    const [postalCode, setPostalCode] = useState("");

    useEffect(()=>{
        const getMe = async () => {
            const response = await readMe();
            const newUser = response.data
            setUser(newUser);
            setEmail(newUser.email);
            setName(newUser.name ? newUser.name : "No name defined");
            setNameTag(newUser.name_tag);
            setUbication(newUser.ubication ? newUser.ubication : "No ubication defined");
            setPostalCode(newUser.postal_code ? newUser.postal_code : "No postal code defined");
        }
        const getCountries = async () => {
            const response = await readAllCountries();
            setCountries(response.data);
        }
        const getProvinces = async () => {
            const response = await readAllProvinces();
            setProvinces(response.data);
        }
        const getLocalities = async () => {
            const response = await readAllLocalities();
            setLocalities(response.data);
        }
        getMe();
        getCountries();
        getProvinces();
        getLocalities();
    }, [])

    const updateProfile = async () => {
        await updateMe(
            {email: email, name: name, name_tag: nameTag, ubication: ubication, postal_code: postalCode},
        );
    }
    const handleUbicationChange = (newUbication) => {
        setUbication(newUbication);
    }

    return (
        <>
            <h1>My Profile</h1>
            <div className={styles.layout}>
                <div className={styles.principalItem}>
                    <h2>Info</h2>
                    <div className={styles.info}>
                        <ModifyModal triggerText={"Email: " + user.email}>
                            <Form
                                buttonText={"Modify"}
                                title={"Modify email"}
                                submitMethod={()=>updateProfile()}
                                redirectTo={"/profile"}
                            >
                                <EmailInput
                                    placeholder={"Email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form>
                        </ModifyModal>
                        <ModifyModal triggerText={"Name: "+(user.name ? user.name : "No name defined")}>
                            <Form
                                buttonText={"Modify"}
                                title={"Modify name"}
                                submitMethod={()=>updateProfile()}
                                redirectTo={"/profile"}
                            >
                                <TextInput
                                    placeholder={"Name"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form>
                        </ModifyModal>
                        <ModifyModal triggerText={"Name tag: "+user.name_tag}>
                            <Form
                                buttonText={"Modify"}
                                title={"Modify name tag"}
                                submitMethod={()=>updateProfile()}
                                redirectTo={"/profile"}
                            >
                                <TextInput
                                    placeholder={"Name tag"}
                                    value={nameTag}
                                    onChange={(e) => setNameTag(e.target.value)}
                                />
                            </Form>
                        </ModifyModal>
                        <ModifyModal triggerText={"Ubication: "+(user.Ubication ?
                            user.Ubication.Country.name +", " + user.Ubication.Province.name +", " + user.Ubication.Locality.name
                            : "No ubication defined"
                        )}>
                            <Form
                                buttonText={"Modify"}
                                title={"Modify ubication"}
                                submitMethod={()=>updateProfile()}
                                redirectTo={"/profile"}
                            >
                                <UbicationInput
                                    countries={countries}
                                    provinces={provinces}
                                    localities={localities}
                                    onChange={(e) => handleUbicationChange(e)}
                                />
                            </Form>
                        </ModifyModal>
                        <ModifyModal triggerText={"Postal code: "+(user.postal_code ? user.postal_code : "No postal code defined")}>
                            <Form
                                buttonText={"Modify"}
                                title={"Modify postal code"}
                                submitMethod={()=>updateProfile()}
                                redirectTo={"/profile"}
                            >
                                <TextInput
                                    placeholder={"Postal code"}
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </Form>
                        </ModifyModal>
                        <p>Role: {user.Role?.name}</p>
                    </div>
                </div>
                <div className={styles.secondaryItem}>
                    <h2>Shopping carts</h2>
                    <div className={styles.shortCarousel}>
                        b
                    </div>
                </div>
                <div className={styles.principalItem}>
                    <h2>Reviews</h2>
                    <div className={styles.longCarousel}>
                        c
                    </div>
                </div>
                <div className={styles.secondaryItem}>
                    <h2>Orders</h2>
                    <div className={styles.list}>
                        d
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;