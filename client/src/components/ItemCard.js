import React, { useState } from "react";
import { Card, Icon, Image, Button, Modal } from 'semantic-ui-react'
import { useHistory } from "react-router";
import { useAddOrderItemMutation } from '../store';

function ItemCard({ item, loggedInUser, handleAddOrderItem }) {

  const [showAddtoCartSuccess, setShowAddToCartSuccess] = useState(false)
  const history = useHistory();

  function goToSignupLogin() {
    history.push("/login")
  }
  
  function handleAddtoCart(item) {
    const order_item = {
      item_id: item.id,
      quantity: 1,
      order_id: 1
    }
    console.log(order_item)
    fetch("/order_items", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order_item)
    })
    .then((r) => r.json())
    .then((orderItem) => handleAddOrderItem(orderItem))
  }

    return (

      <>
        <Card key={item.id} >
        <Image src={item.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{item.name}</Card.Header>
          <Card.Content>Item #{item.id}</Card.Content>
          <Card.Description>{item.description}</Card.Description>
          <br/> ${item.price.toFixed(2)}
        </Card.Content>
        <Card.Content extra>
          {loggedInUser !== null ?
            <Modal
            size={"tiny"}
            centered={true}
            open={showAddtoCartSuccess}
            onClose={() => setShowAddToCartSuccess(false)}
            onOpen={() => setShowAddToCartSuccess(true)}
            trigger={<Button onClick={(e) => handleAddtoCart(item)}><Icon name="add"/>Add to Cart</Button>}
          >
            <Modal.Header>Item Added</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Icon color="teal" name="check circle"/>
                {item.name} added to cart
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setShowAddToCartSuccess(false)}>OK</Button>
            </Modal.Actions>
          </Modal>
            : 
            <Button onClick={goToSignupLogin}>Login/Signup</Button>
          }
            {item.inventory === 0 ? <span style={{ fontStyle: "italic", marginLeft: "10px", color: "#BB2525"}}>Sold Out</span> : item.inventory < 5 ? <span style={{ fontStyle: "italic", marginLeft: "10px", color: "#BB2525"}}>Only {item.inventory} left</span> : ""}
        </Card.Content>
        </Card>
      </>
    )
}

export default ItemCard;