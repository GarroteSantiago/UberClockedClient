import React, {useLayoutEffect, useState} from "react";
import styles from "./Orders.module.scss";
import {readAllOrders, updateOrder} from "../../../../api/order/orders.js";
import ModifyModal from "../../../../components/buttons/modal/modifyModal/ModifyModal.js";
import Form from "../../../../components/data/forms/Form.js";
import DateInput from "../../../../components/data/inputs/date/DateInput.js";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [newDeliveryDate, setNewDeliveryDate] = useState("");

    const toggleOrder = (orderId) => {
        setExpandedOrderId(prev => (prev === orderId ? null : orderId));
    };

    useLayoutEffect(() => {
        const getOrders = async () => {
            const response = await readAllOrders();
            setOrders(response.data);
            orders.sort((a, b) => a.created_at.slice(0,10) - a.created_at.slice(0,10) - b.created_at.slice(0,10));
        }
        getOrders();
    }, [])

    const sentOrder = async (orderId, data) => {
        await updateOrder(orderId, data);
    }

    return (
        <div className={styles.layout}>
            <h1>Orders</h1>
            <div className={styles.orders}>
                <div className={styles.orderHeader}>
                    <p>Cart</p>
                    <p>User</p>
                    <p>Issued</p>
                    <p>Status</p>
                    <p>Delivery</p>
                    <p>Action</p>
                </div>
                {orders.map(order => (
                    <div key={order.id} className={styles.orderWrapper}>
                        <div className={styles.order} onClick={() => toggleOrder(order.id)}>
                            <p>{order.ShoppingCart?.name}</p>
                            <p>{order.User?.name ? order.User.name : 'No name'}</p>
                            <p>{order.created_at.slice(0,10)}</p>
                            <p>{order.Status.name}</p>
                            <p>{order.delivery_date ? order.delivery_date.slice(0, 10) : 'Pending'}</p>
                            {order.Status.name!=="Sent" &&
                                <ModifyModal triggerText={"Send"}>
                                    <Form
                                        redirectTo={"/admin/orders/"}
                                        title={"Set delivery date"}
                                        buttonText={"Set date"}
                                        submitMethod={() => sentOrder(order.id, {
                                            delivery_date:newDeliveryDate,
                                            status_id: 2
                                        })}
                                    >
                                        <DateInput value={newDeliveryDate} onChange={(e) => setNewDeliveryDate(e.target.value)} />
                                    </Form>
                                </ModifyModal>
                            }
                            {order.Status.name==="Sent" &&
                                <ModifyModal triggerText={"Cancel delivery"}>
                                    <Form
                                        redirectTo={"/admin/orders/"}
                                        title={"Cancel delivery date"}
                                        buttonText={"Cancel date"}
                                        submitMethod={() => sentOrder(
                                            order.id,
                                            {delivery_date:null, status_id: 1}
                                        )}
                                    >
                                    </Form>
                                </ModifyModal>
                            }
                        </div>
                        {expandedOrderId === order.id && (
                            <>
                                <div className={styles.product}>
                                    <p>Name</p>
                                    <p>Price</p>
                                    <p>Quantity</p>
                                </div>
                                <div className={styles.products}>
                                    {order.ShoppingCart.Products.map(product => (
                                        <div key={product.id} className={styles.product}>
                                            <p>{product.name}</p>
                                            <p>${product.price}</p>
                                            <p>{product.CartProduct.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Orders;