import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Card } from 'semantic-ui-react'
import { useFetchItemsQuery, useFetchOrdersQuery } from '../store';
import CartList from "./CartList";

function Cart({ loggedInUser, setLoggedInUser }) {

    const [customerOrderItems, setCustomerOrderItems] = useState([])
    const { data, error, isLoading } = useFetchOrdersQuery();
    
    useEffect(() => {
        fetch("/order_items_by_order")
        .then((r) => r.json())
        .then((data) => setCustomerOrderItems(data))

    }, [])



    return (

        <div style={{ margin: "30px"}}>
            <h3>Shopping Cart</h3>
            <CartList 
                loggedInUser={loggedInUser} 
                setLoggedInUser={setLoggedInUser}
                customerOrderItems={customerOrderItems}
                setCustomerOrderItems={setCustomerOrderItems}
                 />
        </div>
    )
}

export default Cart;