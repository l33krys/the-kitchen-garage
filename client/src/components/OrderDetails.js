import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Button, Card, Header, Image, Table } from 'semantic-ui-react'
import { useFetchItemsQuery, useFetchOrdersQuery } from '../store';
import CartList from "./CartList";

function OrderDetails({ loggedInUser, setLoggedInUser, orderHistoryDetails }) {

    console.log(orderHistoryDetails)

    return (

             <Table.Row>
                <Table.Cell>Update Date</Table.Cell>
                <Table.Cell>Order #</Table.Cell>
                <Table.Cell>Status</Table.Cell>
            </Table.Row>


    )
}

export default OrderDetails;