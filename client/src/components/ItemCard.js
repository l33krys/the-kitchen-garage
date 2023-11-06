import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Button, Modal } from 'semantic-ui-react'
import { useHistory } from "react-router";
// import ItemDetails from "../archive/ItemDetails";
import { useAddOrderItemMutation } from '../store';


function ItemCard({ item, loggedInUser, customerOrderItems }) {

  const [showAddtoCartSuccess, setShowAddToCartSuccess] = useState(false)
  const [addOrderItem, results] = useAddOrderItemMutation();
  const history = useHistory();

  function goToSignupLogin() {
    history.push("/login_signup")
  }
  
  function handleAddtoCart(item) {
    const order_item = {
      item_id: item.id,
      quantity: 1,
      order_id: 1
    }
    console.log(order_item)
    // No response with redux yet; total won't update automatically
    addOrderItem(order_item)
  
  }

    return (

      <>
        <Card key={item.id} >
        <Image src={item.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{item.name}</Card.Header>
          <Card.Content>Item #{item.id}</Card.Content>
          
          <Card.Description>{item.description}</Card.Description>
          <br/> ${item.price}
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
            <Button onClick={goToSignupLogin}>Login or Signup to add to cart</Button>
          }
                   
            {/* <Button as={Link} to="/items/{item.id}">View Details</Button> */}
            {/* <Link to={`/items/${item.id}`}>View Details</Link> */}
        </Card.Content>
        </Card>
      </>
    )
}

export default ItemCard;