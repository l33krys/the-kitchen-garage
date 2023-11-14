import React from "react";
import { Button, Icon } from 'semantic-ui-react'

function About() {

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
    </div>

  )
}

export default About;
