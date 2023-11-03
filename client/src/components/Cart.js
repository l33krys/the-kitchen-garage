import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ItemCard from "./ItemCard";
import { Button, Card, Message, Modal } from 'semantic-ui-react'
import { useFetchItemsQuery, useFetchOrdersQuery } from '../store';
import CartList from "./CartList";

function Cart({ loggedInUser, setLoggedInUser, customerOrderItems, setCustomerOrderItems }) {

    // const [customerOrderItems, setCustomerOrderItems] = useState([])
    const history = useHistory();
    const [orderSubmitted, setOrderSubmitted] = useState(false)
    const { data, error, isLoading } = useFetchOrdersQuery();
    
    // useEffect(() => {
    //     fetch("/order_items_by_order")
    //     .then((r) => {
    //         if (r.status === 201) {
    //             // Order was created, no items yet
    //             setCustomerOrderItems([])
    //         } else {
    //             return r.json()
    //         }
    //     })
    //     .then((data) => setCustomerOrderItems(data))

    // }, [])

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
            fetch(`/submit_order`, {
                method: "POST"
            })
            .then((r) => {
                if (r.status === 203) {
                    console.log("Order submitted")
                    setCustomerOrderItems([])
                    setOrderSubmitted(true) 
                    // Transfer customer to order history after order submitted
                    // Move code to useEffect timer if still want to transfer to order history page
                    // history.push("/order_history")                  
                } else {
                    console.log("No order was found or inventory too low")
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
             {/* {orderSubmitted ?
            <Message
                style={{ width: "350px"}}
                header="Order submitted"
                content="Thanks for ordering with The Kitchen Garage" />
            : null} */}
            <Modal
                centered={true}
                open={orderSubmitted}
                onClose={() => setOrderSubmitted(false)}
                onOpen={() => setOrderSubmitted(true)}
                
                >
                <Modal.Header>Order Submitted</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    Thanks for shopping with The Kitchen Garage
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOrderSubmitted(false)}>OK</Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default Cart;