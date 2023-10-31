import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Button, Card } from 'semantic-ui-react'
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

    function handleCheckOut() {
        console.log('i want to place my order')
        fetch(`/submit_order`)
        .then((r) => {
            if (r.status === 203) {
                console.log("Order submitted")
            } else {
                console.log("No order was found")
            }
        })
    }


    return (

        <div style={{ marginTop: "5%", marginLeft: "30%"}}>
            <h3>Shopping Cart</h3>
            <CartList 
                loggedInUser={loggedInUser} 
                setLoggedInUser={setLoggedInUser}
                customerOrderItems={customerOrderItems}
                setCustomerOrderItems={setCustomerOrderItems}
                 />
            <Button onClick={handleCheckOut}>Checkout</Button>
        </div>
    )
}

export default Cart;