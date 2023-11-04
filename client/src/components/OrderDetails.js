import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Button, Card, Header, Image, Table } from 'semantic-ui-react'
import { useHistory } from "react-router";
import { useFetchItemsQuery, useFetchOrdersQuery } from '../store';
import CartList from "./CartList";
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

    console.log(orderDetails)
    const shipping_address = orderDetails.length > 0 ? orderDetails[0].orders.customer.shipping_address : null
    console.log(shipping_address)
    // console.log(orderId)

    function goToOrderHistory() {
        history.push("/order_history")
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
            {/* {orderDetails[0].customer.shipping_address.street && <p>{orderDetails[0].customer.shipping_address.street} <br/>
            {orderDetails[0].customer.shipping_address.city}, {orderDetails[0].customer.shipping_address.state} {orderDetails[0].customer.shipping_address.zip_code}</p>} */}
            
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
                {/* {isLoading ? null : customerOrderItems.map((order_item, key) => (
                    <CartItem key={key} order_item={order_item} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />))} */}
                {orderDetails.map((order_item, key) => (
                    <OrderRow key={key} order_item={order_item} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />))}
                <Table.Row>
                    <Table.Cell>Total</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell style={{ textAlign: "right" }}>${total}</Table.Cell>
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

