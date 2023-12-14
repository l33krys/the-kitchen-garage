import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import Announcement from "./Announcements";

function NavBar({ loggedInUser, setLoggedInUser, customerOrderItems, setSearch, setSortBy }) {

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

    let totalInCart = 0;
    if (customerOrderItems && customerOrderItems.length > 0) {
        const itemsInCart = customerOrderItems.map((order_item, key) => (
            order_item.quantity
            ))
        totalInCart = itemsInCart.reduce((a, b) => a + b, 0)
    }
    // if (customerOrderItems.length > 0) {
    //     const itemsInCart = customerOrderItems.map((order_item, key) => (
    //         order_item.quantity
    //         ))
    //     totalInCart = itemsInCart.reduce((a, b) => a + b, 0)
    // }

    function resetStates() {
        setSearch("")
        setSortBy("Best Match")
    }

    return (

        <div>
            <div style={{ textAlign: "right", paddingTop: "10px"}}>
                {loggedInUser !== null ? 
                (<>
                <div id="promotion" style={{ textAlign: "center", paddingTop: "5px", paddingBottom: "5px", backgroundColor: "#000000", color: "white" }}><Announcement /></div>
                    <p className="account-links" id="hi">Hi, {loggedInUser.first_name}</p>
                    <NavLink className="account-links" to="/account"><Icon name="user"/>My Account</NavLink>
                    <NavLink className="account-links" to="/orders">Order History</NavLink>
                    <NavLink className="account-links" onClick={handleLogOutClick} to="/">Log Out</NavLink>
                    <NavLink style={{ marginRight: "20px", color: "black" }} to="/cart"><Icon name="cart"/> ({totalInCart})</NavLink>
                </>)
                :
                (<NavLink className="account-links" to="/login">Customer Login / Sign Up</NavLink>)
                }
                
            </div>
            <div>
                <div style={{ paddingTop: "0px", paddingBottom: "20px", marginLeft: "50px", width: "60%"}}>
                    <NavLink to="/" exact><h1 id="nav-title" style={{ color: "black" }}><FontAwesomeIcon icon={faWarehouse} style={{color: "#576f72", paddingRight: "10px"}} />The Kitchen Garage</h1></NavLink>
                    <p>a play on appliance garage... where you can find more than just kitchen appliances but all things for the kitchen</p>
                </div>
            </div>
            <div style={{ textAlign: "center", paddingTop: "15px", paddingBottom: "15px", backgroundColor: "#576F72"}}>
                <h5>
                <NavLink className="category-links" activeClassName="nav-link" onClick={resetStates} to="/appliances">Appliances</NavLink>
                <NavLink className="category-links" activeClassName="nav-link" onClick={resetStates} to="/tools">Tools</NavLink>
                <NavLink className="category-links" activeClassName="nav-link" onClick={resetStates} to="/accessories">Accessories</NavLink>
                </h5>
            </div>
        </div>
    )
}

export default NavBar;