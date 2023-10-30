import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemContainer from "./ItemContainer";
import NavBar from "./NavBar";
import Home from "./Home";
import Appliances from "./Appliances";
import Login from "./Login";
import SignUp from "./SignUp";
import Cart from "./Cart";
import CustomerFormLayout from "./CustomerFormLayout";
import ItemDetails from "./ItemDetails";

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState({})

  return (
    <Router>
    <NavBar 
      userLoggedIn={userLoggedIn} />
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
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/login_signup">
      <CustomerFormLayout
        setUserLoggedIn={setUserLoggedIn}
        userLoggedIn={userLoggedIn} />
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
