import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from 'semantic-ui-react'

function About() {

    const history = useHistory()

    function goToHome() {
        history.push("/")
    }

  return (
    
    <div  style={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto", display: "block", width: "60%" }}>
        <h2>About Kitchen Garage</h2>
        <p>Fake Kitchen storefront created for Flatiron Phase 5 Project</p>
        <p>Github repo: https://github.com/l33krys/the-kitchen-garage</p>
        <Button onClick={goToHome}>Return to Store</Button>
    </div>

  )
}

export default About;
