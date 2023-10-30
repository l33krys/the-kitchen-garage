import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import ItemDetails from "./ItemDetails";
import { useAddOrderItemMutation } from '../store';


function ItemCard({ item }) {

  const [addOrderItem, results] = useAddOrderItemMutation();

  function handleAddtoCart(item) {
    const order_item = {
      item_id: item.id,
      quantity: 1,
      order_id: 1
    }
    console.log(order_item)
    addOrderItem(order_item)
  }

    return (

        <Card key={item.id} >
        <Image src={item.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{item.name}</Card.Header>
          ${item.price}
          <Card.Description>{item.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button onClick={(e) => handleAddtoCart(item)}>Add to Cart</Button>
            <Icon />
            {/* <Button as={Link} to="/items/{item.id}">View Details</Button> */}
            {/* <Link to={`/items/${item.id}`}>View Details</Link> */}
        </Card.Content>
      </Card>

    )
}

export default ItemCard;