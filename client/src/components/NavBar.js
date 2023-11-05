import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from 'semantic-ui-react'

function NavBar({ loggedInUser, setLoggedInUser, customerOrderItems, categoryPage, setCategoryPage }) {

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
    let totalInCart = 0;
    if (customerOrderItems.length > 0) {
        const itemsInCart = customerOrderItems.map((order_item, key) => (
            order_item.quantity
            ))
        totalInCart = itemsInCart.reduce((a, b) => a + b, 0)
        
    }
    console.log(totalInCart)
    // const itemsInCart = customerOrderItems.map((order_item, key) => (
    //   order_item.quantity
    // ))
    // const totalInCart = itemsInCart.reduce((a, b) => a + b, 0)
    // console.log(totalInCart)

    return (

        <div>
            <div style={{ textAlign: "right", paddingTop: "10px"}}>
                {loggedInUser !== null ? 
                (<>
                <div id="promotion" style={{ textAlign: "center", paddingTop: "5px", paddingBottom: "5px", backgroundColor: "#000000", color: "white" }}>FREE SHIPPING ON ALL ORDERS</div>
                    <p style={{ marginRight: "20px", marginTop: "10px" }}>Hi, {loggedInUser.first_name}</p>
                    <NavLink style={{ marginRight: "20px", color: "black" }} to="/myaccount"><Icon name="user"/>My Account</NavLink>
                    <NavLink style={{ marginRight: "20px", color: "black" }} to="/order_history">Order History</NavLink>
                    <NavLink style={{ marginRight: "20px", color: "black" }} onClick={handleLogOutClick} to="/">Log Out</NavLink>
                    {/* <NavLink style={{ marginRight: "20px", color: "black" }} to="/cart"><Icon name="cart"/></NavLink> */}
                    <NavLink style={{ marginRight: "20px", color: "black" }} to="/cart"><Icon name="cart"/> ({totalInCart})</NavLink>
                </>)
                :
                (<NavLink style={{ marginRight: "20px", color: "black" }} to="/login_signup">Customer Login / Sign Up</NavLink>)
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
            <div style={{ textAlign: "center", paddingTop: "15px", paddingBottom: "15px", backgroundColor: "#576F72"}}>
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