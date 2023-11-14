import React from 'react'
import { Table } from 'semantic-ui-react'
import CartItem from './CartItem';

function CartList({ loggedInUser, setLoggedInUser, customerOrderItems, setCustomerOrderItems, updateCustomerOrderItems }) {

    const quantities = customerOrderItems ? customerOrderItems.map((order_item, key) => (
        order_item.quantity
      )) : []
    const prices = customerOrderItems ? customerOrderItems.map((order_item, key) => (
      order_item.items.price
    )) : []

    function itemSubtotal(prices, quantities) {
      if (prices.length !== quantities.length || quantities.length === 0 || prices.length === 0) {
        return 0
      }
      return prices.map((price, index) => price * quantities[index])
    }

    const subtotals = itemSubtotal(prices, quantities)
    const total = subtotals.length > 0 ? subtotals.reduce((a, b) => a + b, 0) : 0

    return (
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
            {customerOrderItems.length > 0 ? 
              customerOrderItems.map((order_item, key) => (
                <CartItem 
                  key={key} 
                  order_item={order_item} 
                  loggedInUser={loggedInUser} 
                  setLoggedInUser={setLoggedInUser} 
                  updateCustomerOrderItems={updateCustomerOrderItems}
                  setCustomerOrderItems={setCustomerOrderItems} 
                  customerOrderItems={customerOrderItems} 
                  />))
              : null}
            <Table.Row>
                <Table.Cell>Total</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>${total.toFixed(2)}</Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
    )
}
export default CartList;