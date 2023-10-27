import React, { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";

function Appliances() {

  const [items, setItems] = useState([{}])

 

  useEffect(() => {
    fetch("http://localhost:5555/items")
    .then(r => r.json())
    .then((data) => setItems(data))
  }, [])

  console.log(items)

  return (
    
    <div  style={{ marginTop: "20px", marginLeft: "100px"}}>
      <h1>Appliances</h1>
      <ItemContainer items={items}/>
    </div>
    
  )
}

export default Appliances;