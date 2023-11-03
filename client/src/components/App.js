import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemContainer from "./ItemContainer";
import NavBar from "./NavBar";
import Home from "./Home";
import Appliances from "./Appliances";
import Login from "./Login";
import CustomerAcctLayout from "./CustomerAcctLayout"
import MyAccount from "./MyAccount";
import OrderHistory from "./OrderHistory";
import EditAccount from "./EditAccount";
import EditShippingAddress from "./EditShippingAddress";
import EditAddress from "./EditBillingAddress";
import SignUp from "./SignUp";
import Cart from "./Cart";
import CustomerFormLayout from "./CustomerFormLayout";
// import ItemDetails from "./ItemDetails";

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  const [customerOrderItems, setCustomerOrderItems] = useState([])

  useEffect(() => {
    fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => setLoggedInUser(user))
      }
    })
  }, [])

  // Move back to Cart component to auto update when click on Cart
  useEffect(() => {
    fetch("/order_items_by_order")
    .then((r) => {
        if (r.status === 201) {
            // Order was created, no items yet
            setCustomerOrderItems([])
        } else {
            return r.json()
        }
    })
    .then((data) => setCustomerOrderItems(data))

}, [])

  function updateCustomerOrderItems(updatedItem) {
    const updatedOrderItems = customerOrderItems.map((item) => 
      item.id === updatedItem.id ? updatedItem : item
    )
    setCustomerOrderItems(updatedOrderItems)
  }

console.log(loggedInUser)
console.log(customerOrderItems)

  return (
    <Router>
      <NavBar 
        setLoggedInUser={setLoggedInUser}
        loggedInUser={loggedInUser}
        customerOrderItems={customerOrderItems} />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/appliances">
        <Appliances 
          loggedInUser={loggedInUser}
          customerOrderItems={customerOrderItems} />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/myaccount">
        <CustomerAcctLayout 
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser} />
      </Route>
      <Route path="/order_history">
        <OrderHistory
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser} />
      </Route>
      <Route path="/edit_account" exact>
        <EditAccount
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}  />
      </Route>
      <Route path="/edit_shipping_address">
        <EditShippingAddress
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser} />
      </Route>
      <Route path="/edit_billing_address" exact>
        <EditShippingAddress
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser} />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/cart">
        <Cart 
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}
          customerOrderItems={customerOrderItems}
          setCustomerOrderItems={setCustomerOrderItems}
          updateCustomerOrderItems={updateCustomerOrderItems} />
      </Route>
      <Route path="/login_signup">
        <CustomerFormLayout
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser} />
      </Route>
      {/*<Route path="/items/:itemId">
        <ItemDetails />
      </Route>
       <Route path="/tools">
        <Tools />
      </Route>
      <Route path="/accessories">
        <Accessories />
      </Route> */}
    </Switch>
    {/* <Footer /> */}
  </Router>
);
}

export default App;
