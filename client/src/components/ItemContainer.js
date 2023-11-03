import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";

function ItemContainer({ loggedInUser, customerOrderItems }) {


    return (

        <div>
            <ItemList loggedInUser={loggedInUser} customerOrderItems={customerOrderItems} />
        </div>
    )
}

export default ItemContainer;