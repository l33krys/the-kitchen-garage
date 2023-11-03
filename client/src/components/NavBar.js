import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from 'semantic-ui-react'

function NavBar({ loggedInUser, setLoggedInUser, customerOrderItems }) {

    function handleLogOutClick() {
        fetch("/logout", {
            method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                setLoggedInUser(null)
            }
        })
    }
    console.log(customerOrderItems)
    const itemsInCart = customerOrderItems.map((order_item, key) => (
      order_item.quantity
    ))
    const totalInCart = itemsInCart.reduce((a, b) => a + b, 0)
    console.log(totalInCart)

    return (

        <div>
            <div style={{ textAlign: "right", paddingTop: "10px", marginLeft: "50px"}}>
                {loggedInUser !== null ? 
                (<>
                    <p style={{ marginRight: "20px" }}>Hi, {loggedInUser.first_name}</p>
                    <NavLink style={{ marginRight: "20px" }} to="/myaccount">My Account</NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/order_history">Order History</NavLink>
                    <NavLink style={{ marginRight: "20px" }} onClick={handleLogOutClick} to="/">Log Out</NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/cart"><Icon name="cart"/> ({totalInCart})</NavLink>
                </>)
                :
                (<NavLink style={{ marginRight: "20px" }} to="/login_signup">Customer Login / Sign Up</NavLink>)
                }
                
            </div>
            <div>
                {/* <div style={{ float: "right", paddingTop: "40px", marginLeft: "50px", marginRight: "20px"}}>
                    <NavLink to="/login">Search</NavLink>
                </div> */}
                <div style={{ paddingTop: "10px", paddingBottom: "20px", marginLeft: "50px"}}>
                    <NavLink to="/" exact><h1 style={{ color: "black" }}>The Kitchen Garage</h1></NavLink>
                    <p>a play on appliance garage... where you can find more than just kitchen appliances but all things for the kitchen</p>
                </div>
            </div>
            <div style={{ textAlign: "center", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "#576F72"}}>
                <h5>
                <NavLink activeClassName="nav-link" style={{ marginLeft: "75px", marginRight: "75px", color: "#F0EBE3" }} to="/appliances">Appliances</NavLink>
                <NavLink activeClassName="nav-link" style={{ marginLeft: "75px", marginRight: "75px", color: "#F0EBE3" }} to="/tools">Tools</NavLink>
                <NavLink activeClassName="nav-link" style={{ marginLeft: "75px", marginRight: "75px", color: "#F0EBE3" }} to="/accessories">Accessories</NavLink>
                </h5>
            </div>
        </div>
    )
}

export default NavBar;