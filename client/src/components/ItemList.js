import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Card } from 'semantic-ui-react'
import { useFetchItemsQuery } from '../store';

function ItemList({ items, loggedInUser, customerOrderItems, categoryPage, setCategoryPage, categoryData, handleAddOrderItem }) {

    // const { data, error, isLoading } = useFetchItemsQuery();

    // const categoryData = data ? data.filter((item) => {
    //     return item.category === categoryPage
    // }) : null

    let productCards;
    if (categoryData) {
        productCards = categoryData.map((item, key) => 
            <ItemCard key={key} item={item} loggedInUser={loggedInUser} customerOrderItems={customerOrderItems} handleAddOrderItem={handleAddOrderItem} />)       
    } else (
        <div>"Loading..."</div>
    )

    return (

        <div>
            <Card.Group>
                {/* {categoryData ? "Loading..." : categoryData.map((item, key) => (
                <ItemCard key={key} item={item} loggedInUser={loggedInUser} customerOrderItems={customerOrderItems}/>))} */}
                {productCards}
            </Card.Group>

        </div>
    )
}

export default ItemList;