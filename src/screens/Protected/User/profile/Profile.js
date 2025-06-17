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
import {readAllShoppingCartsOfUser} from "../../../../api/shoppingCart.js";
import {Link} from "react-router-dom";
import SingleVerticalCarousel from "../../../../components/carousel/single/vertical/SingleVerticalCarousel.js";
import Table from "../../../../components/table/Table.js";
import {readAllUserOrders} from "../../../../api/order/orders.js";
import SingleHorizontalCarousel from "../../../../components/carousel/single/horizontal/SingleHorizontalCarousel.js";
import {readAllReviews, readMyReviews} from "../../../../api/reviews.js";

function Profile(){
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [carts, setCarts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);
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
            setName(newUser.name);
            setNameTag(newUser.name_tag);
            setUbication(newUser.ubication);
            setPostalCode(newUser.postal_code);
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
        const getMyCarts = async () => {
            const response = await readAllShoppingCartsOfUser()
            setCarts(response.data);
        }
        const getMyOrders = async () => {
            const response = await readAllUserOrders()
            setOrders(response.data);
        }
        const getMyReviews = async () => {
            const response = await readMyReviews();
            setReviews(response.data);
        }
        getMe();
        getCountries();
        getProvinces();
        getLocalities();
        getMyCarts();
        getMyOrders();
        getMyReviews();
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
                    <Link to={"/profile/shoppingCarts/"} className={styles.subTitle}>
                        <h2>Info</h2>
                    </Link>
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
                    <Link to={"/profile/shoppingCarts/"} className={styles.subTitle}>
                        <h2>Shopping carts</h2>
                    </Link>
                    {carts.length > 0 && (
                        <SingleVerticalCarousel options={carts} baseUrl={"/profile/shoppingCarts/"}/>
                    )}
                    {carts.length === 0 && (
                        <p>You've no shopping carts</p>
                    )}
                </div>
                <div className={styles.principalItem}>
                    <Link to={"/profile/reviews/"} className={styles.subTitle}>
                        <h2>Reviews</h2>
                    </Link>
                    {reviews.length > 0 && (
                        <SingleHorizontalCarousel baseUrl={"/profile/reviews/"} options={reviews} />
                    )}
                    {reviews.length === 0 && (
                        <p>You've done no reviews</p>
                    )}
                </div>
                <div className={styles.secondaryItem}>
                    <Link to={"/profile/orders/"} className={styles.subTitle}>
                        <h2>Orders</h2>
                    </Link>
                    <Table headers={["Date","Amount","Status"]} rows={orders} renderRow={(order) =>
                        <>
                            <p>{order.created_at.slice(5,10)}</p>
                            <p>{order.value}</p>
                            <p>{order.Status?.name}</p>
                        </>
                    } />
                </div>
            </div>
        </>
    )
}
export default Profile;