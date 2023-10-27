import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {

    return (

        <div style={{ backgroundColor: "#576F72"}}>
        <div style={{ paddingTop: "10px", paddingBottom: "20px", marginLeft: "50px"}}>
            <NavLink to="/" exact><h1 style={{color: "#F0EBE3"}}>The Kitchen Garage</h1></NavLink>
            <p style={{color: "#F0EBE3"}}>a play on appliance garage... where you can find more than just kitchen appliances but all things for the kitchen</p>
            <h3>
            <NavLink style={{ marginRight: "20px", color: "#F0EBE3"}} to="/appliances">Appliances</NavLink>
            <NavLink style={{ marginRight: "20px", color: "#F0EBE3"}} to="/tools">Tools</NavLink>
            <NavLink style={{ marginRight: "20px", color: "#F0EBE3"}} to="/accessories">Accessories</NavLink>
            <NavLink style={{ marginRight: "20px", color: "#F0EBE3"}} to="/login">Customer Login</NavLink>
            </h3>
        </div>
        </div>
    )
}

export default NavBar;