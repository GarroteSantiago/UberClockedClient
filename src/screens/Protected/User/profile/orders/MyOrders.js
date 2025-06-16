import React, {useLayoutEffect, useState} from "react";
import styles from "./MyOrders.module.scss";
import Table from "../../../../../components/table/Table.js";
import {readAllUserOrders} from "../../../../../api/order/orders.js";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const toggleOrder = (orderId) => {
        setExpandedOrderId(prev => (prev === orderId ? null : orderId));
    };

    useLayoutEffect(() => {
        const getOrders = async () => {
            const response = await readAllUserOrders();
            setOrders(response.data);
            orders.sort((a, b) => a.created_at.slice(0,10) - a.created_at.slice(0,10) - b.created_at.slice(0,10));
        }
        getOrders();
    }, [])

    return (
        <div className={styles.layout}>
            <h1>Orders</h1>
            <Table headers={["Cart","Issued","Status"]} rows={orders} renderRow={(order)=>
                <>
                    <div key={order.id} className={styles.orderWrapper}>
                        <div className={styles.order} onClick={() => toggleOrder(order.id)}>
                            <p>{order.ShoppingCart.name}</p>
                            <p>{order.created_at.slice(0,10)}</p>
                            <p>{order.Status.name}</p>
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
                </>
            } />
        </div>
    )
}
export default Orders;