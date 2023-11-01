import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Button, Card, Header, Image, Table } from 'semantic-ui-react'
import { useFetchItemsQuery, useFetchOrdersQuery } from '../store';
import CartList from "./CartList";
import OrdersList from "./OrdersList";

function OrderHistory({ loggedInUser, setLoggedInUser }) {

    // const [orderHistoryDetails, setOrderHistoryDetails] = useState([])
    
    // useEffect(() => {
    //     fetch("/order_history_details")
    //     .then((r) => r.json())
    //     .then((data) => setOrderHistoryDetails(data))

    // }, [])

    const [orderHistory, setOrderHistory] = useState([])

    useEffect(() => {
        fetch("/order_history")
        .then((r) => r.json())
        .then((data) => setOrderHistory(data))

    }, [])

    console.log(orderHistory)    

    return (

        <div style={{ marginTop: "5%", marginLeft: "30%"}}>
            <h3>Order History</h3>
            <Table style={{ marginTop: "5%" }} basic='very' celled collapsing>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={{ width: "150px" }}>Date</Table.HeaderCell>
                    <Table.HeaderCell style={{ width: "150px" }}>Order #</Table.HeaderCell>
                    <Table.HeaderCell style={{ width: "150px" }}>Status</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {orderHistory ? orderHistory.map((order, key) => (
            <OrdersList key={key} order={order} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />))
            : "Loading"
        }
                </Table.Body>
            </Table>
        </div>
    )
}

export default OrderHistory;