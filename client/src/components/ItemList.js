import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Card } from 'semantic-ui-react'

function ItemList({ items }) {

    const itemsToDisplay = items.map((item, key) => (
        <ItemCard item={item} />
    ))

    return (

        <div>
            <Card.Group>
                {items ? itemsToDisplay : "Loading..."}
            </Card.Group>
        </div>
    )
}

export default ItemList;