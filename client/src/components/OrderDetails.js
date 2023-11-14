import React, { useEffect, useState } from "react";
import { Button, Table } from 'semantic-ui-react'
import { useHistory } from "react-router";
import OrderRow from "./OrderRow";

function OrderDetails({ loggedInUser, setLoggedInUser, orderId }) {

    const history = useHistory()
    const [orderDetails, setOrderDetails] = useState([])

    useEffect(() => {
        fetch(`/order_details/${orderId}`)
        .then((r) => r.json())
        .then((orderDetails) => {
            setOrderDetails(orderDetails)
        })
    }, [])

    function goToOrderHistory() {
        history.push("/orders")
    }

    const quantities = orderDetails.map((order_item, key) => (
        order_item.quantity
      ))
    const prices = orderDetails.map((order_item, key) => (
      order_item.items.price
    ))

    function itemSubtotal(prices, quantities) {
      if (prices.length !== quantities.length) {
        return 0
      }
      return prices.map((price, index) => price * quantities[index])
    }

    const subtotals = itemSubtotal(prices, quantities)
    const total = subtotals.reduce((a, b) => a + b, 0)

    return (
        <div style={{ marginTop: "5%", marginLeft: "30%"}} >
            <h3>Order #{orderId}</h3>
            
            <Table basic='very' celled collapsing>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {orderDetails.map((order_item, key) => (
                    <OrderRow 
                        key={key} 
                        order_item={order_item} 
                        loggedInUser={loggedInUser} 
                        setLoggedInUser={setLoggedInUser} 
                        />))}
                <Table.Row>
                    <Table.Cell>Total</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell style={{ textAlign: "right" }}>${total.toFixed(2)}</Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                </Table.Row>
                </Table.Body>
            </Table>
            <Button onClick={goToOrderHistory}>Back to Order History</Button>
        </div>
    )
}

export default OrderDetails;

