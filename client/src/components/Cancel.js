import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Icon } from 'semantic-ui-react'

function Cancel() {

    const history = useHistory()

    function goToHome() {
        history.push("/")
    }

  return (
    
    <div  style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px", marginLeft: "auto", marginRight: "auto", display: "block", width: "60%", padding: "20px" }}>
        <h2 style={{ color: "black", padding: "20px" }}>Please contact us for further assistance</h2>
        <Button><a href="mailto:kitchen_garage@tkg.com" style={{ color: "black", margin: "10px" }}><Icon name="mail" />Contact Us</a></Button>
        {/* <Button onClick={goToHome}>Return to Store</Button> */}
    </div>

  )
}

export default Cancel;
