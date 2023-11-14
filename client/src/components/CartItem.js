import React from 'react'
import { Header, Image, Table, Icon } from 'semantic-ui-react'

function CartItem({ order_item, updateCustomerOrderItems, setCustomerOrderItems, customerOrderItems }) {

    function handleUpdateQuantity(addOrSubtract) {
      if (addOrSubtract === "increase") {
          order_item.quantity += 1
          patchToServer()
      } else if (addOrSubtract === "decrease" && order_item.quantity > 1) {
        // Quantity can't go below 1 otherwise remove item from cart with button
           order_item.quantity -= 1
           patchToServer()
      } else if (addOrSubtract === "decrease" && order_item.quantity === 1) {
          handleOrderItemDelete(order_item.id)
      }}
    
    function patchToServer() {
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

    function handleOrderItemDelete(delOrderItem) {
      console.log("handle delete function", `${delOrderItem}`)
      fetch(`/order_items/${delOrderItem}`, {
        method: "DELETE"
      })
      .then(() => {
        const updated = customerOrderItems.filter((item) => 
          item.id !== delOrderItem
        )
      setCustomerOrderItems(updated)
  })
}
   
    return (
       
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src={order_item.items.image} rounded size='mini' />
            <Header.Content style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            {order_item.items.name} 
              <Header.Subheader style={{ color: "red"}} >
                {order_item.quantity > order_item.items.inventory ? "Reduce quantity" : null}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell style={{ textAlign: "right" }} >${order_item.items.price.toFixed(2)}</Table.Cell>
        <Table.Cell style={{ textAlign: "right" }}>
          <Icon onClick={() => handleUpdateQuantity("increase")} name="angle up"/>
          {order_item.quantity}
          <Icon onClick={() => handleUpdateQuantity("decrease")} name="angle down"/>
        </Table.Cell>
        <Table.Cell style={{ textAlign: "right" }} >${(order_item.items.price*order_item.quantity).toFixed(2)}</Table.Cell>
        <Table.Cell>
           <Icon onClick={(e) => handleOrderItemDelete(order_item.id)} name="trash"/>
        </Table.Cell>
       </Table.Row>

    )
}

export default CartItem;