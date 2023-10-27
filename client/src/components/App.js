import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemContainer from "./ItemContainer";
import NavBar from "./NavBar";
import Home from "./Home";
import Appliances from "./Appliances";

function App() {

  return (
    <Router>
    <NavBar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/appliances">
        <Appliances />
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
