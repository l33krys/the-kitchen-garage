import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Button, Card, Header, Image, Table } from 'semantic-ui-react'
import { useFetchItemsQuery, useFetchOrdersQuery } from '../store';
import CartList from "./CartList";
import OrderDetails from "./OrderDetails";

function OrdersList({ loggedInUser, setLoggedInUser, order }) {

    console.log(order)

    return (

    <Table.Row>
        <Table.Cell>{order.updated_at}</Table.Cell>
        <Table.Cell>{order.id}</Table.Cell>
        <Table.Cell>{order.status}</Table.Cell>
    </Table.Row>


    )
}

export default OrdersList;