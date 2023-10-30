import React from 'react'
import { Header, Image, Table, Button } from 'semantic-ui-react'
import { useDeleteCustomerMutation } from "../store";

function CartItem({ order_item }) {
    const [deleteOrderItem, results] = useDeleteCustomerMutation();

    function handleOrderItemDelete(delOrderItem) {
        // OrderItem Id
        console.log(delOrderItem)
        deleteOrderItem(delOrderItem)
    }
    
    return (

        
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src={order_item.items.image} rounded size='mini' />
            <Header.Content>
              
              <Header.Subheader style={{ paddingLeft: "30px", paddingRight: "30px" }}>{order_item.items.name}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>${order_item.items.price}</Table.Cell>
        <Table.Cell>
            <Button onClick={(e) => handleOrderItemDelete(order_item.id)}>Delete</Button>
        </Table.Cell>
       </Table.Row>

    )
}

export default CartItem;