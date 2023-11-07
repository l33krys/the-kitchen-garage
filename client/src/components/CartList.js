import React from 'react'
import { Header, Image, Table } from 'semantic-ui-react'
import { useFetchOrderItemsQuery } from '../store';
import CartItem from './CartItem';

function CartList({ loggedInUser, setLoggedInUser, customerOrderItems, setCustomerOrderItems, updateCustomerOrderItems }) {

  //   function handleOrderItemDelete(delOrderItem) {

  //       fetch(`/order_items/${delOrderItem}`, {
  //         method: "DELETE"
  //       })
  //       .then(() => {
  //         const updated = customerOrderItems.filter((item) => {
  //           if (item.id !== delOrderItem) {
  //             return item
  //           } else {
  //             return null
  //           }
  //         })
  //       setCustomerOrderItems(updated)
  //   })
  // }

    const quantities = customerOrderItems.map((order_item, key) => (
        order_item.quantity
      ))
    const prices = customerOrderItems.map((order_item, key) => (
      order_item.items.price
    ))

    function itemSubtotal(prices, quantities) {
      if (prices.length !== quantities.length) {
        return 0
      }
      return prices.map((price, index) => price * quantities[index])
    }

    const subtotals = itemSubtotal(prices, quantities)
    const total = subtotals.reduce((a, b) => a + b, 0)

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
            {/* {isLoading ? null : customerOrderItems.map((order_item, key) => (
                <CartItem key={key} order_item={order_item} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />))} */}
            {customerOrderItems.length > 0 ? customerOrderItems.map((order_item, key) => (
                <CartItem key={key} order_item={order_item} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} updateCustomerOrderItems={updateCustomerOrderItems}setCustomerOrderItems={setCustomerOrderItems} customerOrderItems={customerOrderItems} />))
              : null}
            <Table.Row>
                <Table.Cell>Total</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>${total}</Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
    )
}
export default CartList;