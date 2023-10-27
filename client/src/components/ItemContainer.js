import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";

function ItemContainer({ items }) {


    return (

        <div>
            <h3>Item Container</h3>
            <ItemList items={items} />
        </div>
    )
}

export default ItemContainer;