import React from "react";
import { useHistory } from "react-router";
import { Button } from 'semantic-ui-react'

function Success() {

    const history = useHistory()

    function goToHome() {
        history.push("/")
    }

  return (
    
      <div  style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px", marginLeft: "auto", marginRight: "auto", display: "block", width: "60%", padding: "20px" }}>
        <h3 >Thanks for shopping at</h3>
          <h1 id="success-thanks" style={{ color: "black", paddingBottom: "20px" }}>The Kitchen Garage</h1>
        <Button onClick={goToHome}>Return to Store</Button>
      </div>

  )
}

export default Success;
