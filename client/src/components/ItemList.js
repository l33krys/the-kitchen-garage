import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Card } from 'semantic-ui-react'
import { useFetchItemsQuery } from '../store';

function ItemList({ items, loggedInUser, customerOrderItems }) {

    const { data, error, isLoading } = useFetchItemsQuery();

    return (

        <div>
            <Card.Group>
                {isLoading ? "Loading..." : data.map((item, key) => (
                <ItemCard key={key} item={item} loggedInUser={loggedInUser} customerOrderItems={customerOrderItems}/>))}
            </Card.Group>
        </div>
    )
}

export default ItemList;