import React, { useEffect, useState } from "react";
import { Icon } from 'semantic-ui-react'


function Footer() {





    return (

        <div style={{ textAlign: "center", paddingTop: "25px", paddingBottom: "15px", marginTop: "20px", backgroundColor: "#576F72", color: "white"}}>
            <h5>About Kitchen Garage</h5>
            <h5><a href="mailto:kitchen_garage@tkg.com" style={{ color: "white" }}><Icon name="mail" />Contact Us</a></h5>
        </div>
    )
}

export default Footer;