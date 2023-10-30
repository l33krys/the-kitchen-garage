import React from 'react'
import { Header, Image, Table } from 'semantic-ui-react'
import { useFetchOrderItemsQuery } from '../store';
import CartItem from './CartItem';

// function CartList() {

//     const { data, error, isLoading } = useFetchOrderItemsQuery();
    
//     let line_items;
//     if (isLoading) {
//         line_items = null
//     } else {
//         line_items = data.map((order_item, key) => (
//             <CartItem key={key} order_item={order_item} />))
//         return line_items
//     }
    
    
//     return (
     
//         <Table basic='very' celled collapsing>
//             <Table.Header>
//             <Table.Row>
//                 <Table.HeaderCell>Item</Table.HeaderCell>
//                 <Table.HeaderCell>Quantity</Table.HeaderCell>
//                 <Table.HeaderCell>Price</Table.HeaderCell>
//                 <Table.HeaderCell></Table.HeaderCell>
//             </Table.Row>
//             </Table.Header>
//             <Table.Body>
//                 {line_items}
//             </Table.Body>
//         </Table>
//     )
// }
// export default CartList;


function CartList() {

    const { data, error, isLoading } = useFetchOrderItemsQuery();

    console.log(data)

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
            {isLoading ? null : data.map((order_item, key) => (
                <CartItem key={key} order_item={order_item} />))}
            </Table.Body>
        </Table>
    )
}
export default CartList;