import React, { useState } from 'react'
import { Header, Image, Table, Button, Icon } from 'semantic-ui-react'
import { useDeleteCustomerMutation } from "../store";

function OrderRow({ loggedInUser, order_item }) {
  
    return (
       
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src={order_item.items.image} rounded size='mini' />
          </Header>
            {order_item.items.name} 
        </Table.Cell>
        <Table.Cell style={{ textAlign: "right" }} >${order_item.items.price}</Table.Cell>
        <Table.Cell style={{ textAlign: "center" }}>
            {order_item.quantity}
        </Table.Cell>
        <Table.Cell style={{ textAlign: "right" }} >${order_item.items.price*order_item.quantity}</Table.Cell>
        <Table.Cell>
        </Table.Cell>
       </Table.Row>

    )
}

export default OrderRow;