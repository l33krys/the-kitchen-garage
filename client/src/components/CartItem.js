import React, { useState } from 'react'
import { Header, Image, Table, Button, Icon } from 'semantic-ui-react'
import { useDeleteCustomerMutation } from "../store";

function CartItem({ order_item, handleOrderItemDelete, loggedInUser, updateCustomerOrderItems }) {
    const [deleteOrderItem, results] = useDeleteCustomerMutation();
    const [isHover, setHover] = useState(false)

    function handleUpdateQuantity(addOrSubtract) {
      if (addOrSubtract === "increase") {
          order_item.quantity += 1
      } else if (addOrSubtract === "decrease") {
        // Quantity can't go below 1 otherwise remove item from cart with button
        if (order_item.quantity > 1) {
           order_item.quantity -= 1
        } else {
          handleOrderItemDelete(order_item.id)
        }
        }
      const updateObject = {
        id: order_item.id,
        item_id: order_item.items.id,
        quantity: order_item.quantity,
        order_id: order_item.orders.id
      }
      fetch(`/order_items/${order_item.id}`, {
        method: "PATCH",
        mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(updateObject)
      })
      .then((r) => r.json())
      .then((updated) => updateCustomerOrderItems(updated))
    }

    console.log(order_item.items.inventory)

    // function handleMouseEvent(event) {
    //   if (event === "over") {
    //     // setHover(true)
    //   } else if (event === "out") {
    //     // setHover(false)
    //   }
    // }
   
    return (
       
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src={order_item.items.image} rounded size='mini' />
            <Header.Content style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            {order_item.items.name} 
              <Header.Subheader style={{ color: "red"}} >
                {order_item.items.inventory < 5 ? "Low Inventory" : null}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell style={{ textAlign: "right" }} >${order_item.items.price}</Table.Cell>
        <Table.Cell style={{ textAlign: "right" }}>
          <Icon onClick={() => handleUpdateQuantity("increase")} name="angle up"/>
          {order_item.quantity}
          <Icon onClick={() => handleUpdateQuantity("decrease")} name="angle down"/>
          {/* <Button circular icon="angle angle down" 
            // style={{ backgroundColor: isHover ? "grey" : "white"}}
            onMouseOver={() => handleMouseEvent("over")} 
            onMouseOut={() => handleMouseEvent("out")} 
            onClick={() => handleUpdateQuantity("increase")} /> */}
        </Table.Cell>
        <Table.Cell style={{ textAlign: "right" }} >${order_item.items.price*order_item.quantity}</Table.Cell>
        <Table.Cell>
           <Icon onClick={(e) => handleOrderItemDelete(order_item.id)} name="trash"/>
        </Table.Cell>
       </Table.Row>

    )
}

export default CartItem;