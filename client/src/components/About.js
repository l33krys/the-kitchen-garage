import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Icon } from 'semantic-ui-react'

function About() {

    const history = useHistory()

    function goToHome() {
        history.push("/")
    }

  return (
    
    <div  style={{ padding: "50px", marginLeft: "auto", marginRight: "auto", display: "block", textAlign: "center" }}>
        <h2>About Kitchen Garage</h2>
        <p>Fake Kitchen storefront created for Flatiron Phase 5 Project</p>
        <a target="_blank" href="https://github.com/l33krys/the-kitchen-garage">
        <Button style={{ margin: "30px" }}>
          <Icon name="github"/>
          The Kitchen Garage
        </Button>
        </a>
        {/* <br/>
        <Button style={{ margin: "20px", marginTop: "60px" }}onClick={goToHome}>Return to Store</Button> */}
    </div>

  )
}

export default About;
