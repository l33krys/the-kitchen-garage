import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {

    return (
        <div style={{ marginTop: "20px", marginLeft: "50px"}}>
            <NavLink to="/" exact><h1>The Kitchen Garage</h1></NavLink>
            <p>a play on appliance garage... where you can find more than just kitchen appliances but all things for the kitchen</p>
            <h3>
            <NavLink style={{ marginRight: "20px"}} to="/appliances">Appliances</NavLink>
            <NavLink style={{ marginRight: "20px"}} to="/tools">Tools</NavLink>
            <NavLink style={{ marginRight: "20px"}} to="/accessories">Accessories</NavLink>
            </h3>
        </div>
    )
}

export default NavBar;