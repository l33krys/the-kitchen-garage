import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import ItemSort from "./ItemSort";

function ItemContainer({ loggedInUser, customerOrderItems, categoryData }) {


    return (

        <div>
            <ItemList 
                loggedInUser={loggedInUser} 
                customerOrderItems={customerOrderItems} 
                categoryData={categoryData} />
        </div>
    )
}

export default ItemContainer;