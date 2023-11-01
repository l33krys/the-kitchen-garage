import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Button, Card, Message } from 'semantic-ui-react'
import { useFetchItemsQuery, useFetchOrdersQuery } from '../store';
import CartList from "./CartList";

function Cart({ loggedInUser, setLoggedInUser }) {

    const [customerOrderItems, setCustomerOrderItems] = useState([])
    const [orderSubmitted, setOrderSubmitted] = useState(false)
    const { data, error, isLoading } = useFetchOrdersQuery();
    
    useEffect(() => {
        fetch("/order_items_by_order")
        .then((r) => {
            if (r.status === 201) {
                // Order was created, no items yet
                setCustomerOrderItems([])
            } else {
                return r.json()
            }
        })
        .then((data) => setCustomerOrderItems(data))

    }, [])

    useEffect(() => {
        if (orderSubmitted) {
          const timer = setTimeout(() => {
            setOrderSubmitted(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [orderSubmitted]);


    function handleCheckOut() {
        if (customerOrderItems.length > 0) {
            fetch(`/submit_order`)
            .then((r) => {
                if (r.status === 203) {
                    console.log("Order submitted")
                    setCustomerOrderItems([])
                    setOrderSubmitted(true)                   
                } else {
                    console.log("No order was found")
                }
            })
        }
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
             {orderSubmitted ?
            <Message
                style={{ width: "350px"}}
                header="Order submitted"
                content="Thanks for ordering with The Kitchen Garage" />
            : null}
        </div>
    )
}

export default Cart;