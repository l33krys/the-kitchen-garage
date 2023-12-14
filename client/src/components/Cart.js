import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { Button, Modal } from 'semantic-ui-react'
import { useFetchItemsQuery, useFetchOrdersQuery } from '../store';
import CartList from "./CartList";

function Cart({ loggedInUser, setLoggedInUser, customerOrderItems, setCustomerOrderItems, updateCustomerOrderItems, refreshInventory }) {

    const history = useHistory();
    const [orderSubmitted, setOrderSubmitted] = useState(false)
    const [invetoryTooLow, setInventoryTooLow] = useState(false)
    const { data, error, isLoading } = useFetchOrdersQuery();
    const formRef = useRef()

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
                    refreshInventory()
                    handleFormSubmit()                
                } else if (r.status === 401) {
                    console.log("Inventory too low")
                    setInventoryTooLow(true)
                } else {
                    console.log("No order was found")
                    setInventoryTooLow(true)
                }
            })
        }
    }

    function handleFormSubmit() {
        formRef.current.submit()
    }


    return (

        <div style={{ marginTop: "5%", marginLeft: "30%"}}>
            <h3>Shopping Cart</h3>
            <CartList 
                loggedInUser={loggedInUser} 
                setLoggedInUser={setLoggedInUser}
                customerOrderItems={customerOrderItems}
                setCustomerOrderItems={setCustomerOrderItems}
                updateCustomerOrderItems={updateCustomerOrderItems}
                 />
                 <form        
                    action="/create-checkout-session"
                    method="POST"
                    onSubmit={(e) => e.preventDefault()} 
                    style={{ display: "none" }}
                    >
                    <Button onClick={handleCheckOut}>Checkout</Button>
                </form>
                <form        
                    ref={formRef}
                    action="/create-checkout-session"
                    method="POST"
                    onSubmit={(e) => e.preventDefault()} 
                    style={{ display: "none" }}
                    >
                    <Button type="submit">Stripe</Button>
                </form>
                    {customerOrderItems && customerOrderItems.length > 0 ? <Button onClick={handleCheckOut}>Go To Payment</Button> : null}
                <p style={{ fontStyle: "italic", color: "#BB2525" }}>Note: If order is processed, you will be redirected to a Stripe-hosted payment page in test mode.<br/>
                    Use test card number 4242 4242 4242 4242 with future expiry date to complete checkout.</p>
                <Modal
                    centered={true}
                    open={invetoryTooLow}
                    onClose={() => setInventoryTooLow(false)}
                    onOpen={() => setInventoryTooLow(true)}
                    size={"tiny"}
                    >
                    <Modal.Header>Order Not Submitted</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                        Not enough inventory. Please lower your quantities.
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setInventoryTooLow(false)}>OK</Button>
                    </Modal.Actions>
                </Modal>
        </div>
    )
}

export default Cart;