import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";

function ItemContainer({ loggedInUser }) {


    return (

        <div>
            <ItemList loggedInUser={loggedInUser} />
        </div>
    )
}

export default ItemContainer;