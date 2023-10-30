import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemContainer from "./ItemContainer";
import NavBar from "./NavBar";
import Home from "./Home";
import Appliances from "./Appliances";
import Login from "./Login";
import CustomerAcctLayout from "./CustomerAcctLayout"
import MyAccount from "./MyAccount";
import EditAccount from "./EditAccount";
import EditShippingAddress from "./EditShippingAddress";
import EditAddress from "./EditAddress";
import SignUp from "./SignUp";
import Cart from "./Cart";
import CustomerFormLayout from "./CustomerFormLayout";
import ItemDetails from "./ItemDetails";

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {
    fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => setLoggedInUser(user))
      }
    })
  }, [])

//   function handleLogOutClick() {
//     fetch("/logout", {
//         method: "DELETE",
//     })
//     .then((r) => {
//         if (r.ok) {
//             setLoggedInUser(null)
//         }
//     })
// }

console.log(loggedInUser)

  return (
    <Router>
      <NavBar 
        setLoggedInUser={setLoggedInUser}
        loggedInUser={loggedInUser} />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/appliances">
        <Appliances />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/myaccount">
        <CustomerAcctLayout 
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
          loggedInUser={loggedInUser}  />
      </Route>
      <Route path="/edit_address" exact>
        <EditAddress
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}  />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/login_signup">
        <CustomerFormLayout
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser} />
      </Route>
      <Route path="/items/:itemId">
        <ItemDetails />
      </Route>
      {/* <Route path="/tools">
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
