import React, { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";

function Tools({ loggedInUser, customerOrderItems, categoryData }) {



  return (
    
    <div  style={{ marginTop: "20px", marginLeft: "100px"}}>
      <h1>Tools</h1>
      <ItemContainer 
        loggedInUser={loggedInUser} 
        customerOrderItems={customerOrderItems} 
        categoryData={categoryData} />
    </div>
    
  )
}

export default Tools;