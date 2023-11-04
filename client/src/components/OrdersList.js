import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ItemCard from "./ItemCard";
import { Button, Card, Header, Image, Table, Accordion } from 'semantic-ui-react'
import { useFetchItemsQuery, useFetchOrdersQuery } from '../store';
import CartList from "./CartList";
import OrderDetails from "./OrderDetails";

function OrdersList({ loggedInUser, setLoggedInUser, order }) {

    const history = useHistory()

    console.log(order)

    function handleViewDetails() {  
        if (order) {
          const orderId = order.id;
          history.push(`/orders/${orderId}`);
        } else {
          console.error("Order Id is undefined.");
        }
      }

    return (

    <Table.Row>
        <Table.Cell>{order.updated_at}</Table.Cell>
        <Table.Cell>{order.id}</Table.Cell>
        <Table.Cell>{order.status == "submitted" ? "Order Submitted" : ""}</Table.Cell>
        <Table.Cell><Button onClick={handleViewDetails}>View Details</Button></Table.Cell>
    </Table.Row>

)
}

export default OrdersList;