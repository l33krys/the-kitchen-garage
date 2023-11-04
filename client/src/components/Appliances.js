import React, { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";

function Appliances({ loggedInUser, customerOrderItems }) {

  // useEffect(() => {
  //   fetch("http://localhost:5555/items")
  //   .then(r => r.json())
  //   .then((data) => setItems(data))
  // }, [])

  return (
    
    <div  style={{ marginTop: "20px", marginLeft: "100px"}}>
      <h1>Appliances</h1>
      <ItemContainer loggedInUser={loggedInUser} customerOrderItems={customerOrderItems} />
    </div>
    
  )
}

export default Appliances;