import React from "react";
import ItemCard from "./ItemCard";
import { Card } from 'semantic-ui-react'

function ItemList({ loggedInUser, customerOrderItems, categoryData, handleAddOrderItem }) {

    let productCards;
    if (categoryData) {
        productCards = categoryData.map((item, key) => 
            <ItemCard 
                key={key} 
                item={item} 
                loggedInUser={loggedInUser} 
                customerOrderItems={customerOrderItems} 
                handleAddOrderItem={handleAddOrderItem} 
                />)       
    } else (
        <div>"Loading..."</div>
    )

    return (

        <div>
            <Card.Group>
                {productCards}
            </Card.Group>
        </div>
    )
}

export default ItemList;