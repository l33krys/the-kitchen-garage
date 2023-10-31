import React from 'react'
import { Header, Image, Table } from 'semantic-ui-react'
import { useFetchOrderItemsQuery } from '../store';
import CartItem from './CartItem';

function CartList({ loggedInUser, setLoggedInUser, customerOrderItems, setCustomerOrderItems }) {

    function handleOrderItemDelete(delOrderItem) {

        fetch(`/order_items/${delOrderItem}`, {
          method: "DELETE"
        })
        .then(() => {
          const updated = customerOrderItems.filter((item) => {
            if (item.id !== delOrderItem) {
              return item
            } else {
              return null
            }
          })
        setCustomerOrderItems(updated)
    })
  }

    return (
        <Table basic='very' celled collapsing>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Item</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {/* {isLoading ? null : customerOrderItems.map((order_item, key) => (
                <CartItem key={key} order_item={order_item} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />))} */}
            {customerOrderItems.map((order_item, key) => (
                <CartItem key={key} order_item={order_item} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} handleOrderItemDelete={handleOrderItemDelete} />))}
            </Table.Body>
        </Table>
    )
}
export default CartList;