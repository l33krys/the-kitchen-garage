import React from "react";
import { useHistory } from "react-router";
import { Button, Table } from 'semantic-ui-react'

function OrdersList({ order }) {

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