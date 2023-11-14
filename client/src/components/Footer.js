import React from "react";
import { Icon } from 'semantic-ui-react';

function Footer() {

    return (

        <div id="footer" style={{ position: "static", textAlign: "center", paddingTop: "25px", paddingBottom: "15px", marginTop: "20px", backgroundColor: "#576F72", color: "white"}}>
            <h5><a href="/about" style={{ color: "white" }}>About Kitchen Garage</a></h5>
            <h5><a href="mailto:kitchen_garage@tkg.com" style={{ color: "white" }}><Icon name="mail" />Contact Us</a></h5>
        </div>
    )
}

export default Footer;

