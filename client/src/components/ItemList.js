import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Card } from 'semantic-ui-react'
import { useFetchItemsQuery } from '../store';

function ItemList({ items }) {

    const { data, error, isLoading } = useFetchItemsQuery();

    console.log(data, error, isLoading);

    // const itemsToDisplay = data.map((item, key) => (
    //     <ItemCard item={item} />
    // ))

    return (

        <div>
            <Card.Group>
                {isLoading ? "Loading..." : data.map((item, key) => (
        <ItemCard key={key} item={item} />
    ))}
                {/* {isLoading ? itemsToDisplay : "Loading..."} */}
            </Card.Group>
        </div>
    )
}

export default ItemList;