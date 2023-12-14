import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useFetchItemsQuery } from '../store';
import NavBar from "./NavBar";
import Home from "./Home";
import Appliances from "./Appliances";
import Tools from "./Tools";
import Accessories from "./Accessories";
import CustomerAcctLayout from "./CustomerAcctLayout"
import OrderHistory from "./OrderHistory";
import EditAccount from "./EditAccount";
import EditShippingAddress from "./EditShippingAddress";
import Cart from "./Cart";
import CustomerFormLayout from "./CustomerFormLayout";
import OrderDetails from "./OrderDetails";
import About from "./About";
import Footer from "./Footer";
import Success from "./Success";
import Cancel from "./Cancel";

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  const [customerOrderItems, setCustomerOrderItems] = useState([])
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("Best Match")
  const [abortStripe, setAbortStripe] = useState(false)

  useEffect(() => {
    fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => setLoggedInUser(user))
      }
    })
  }, [])

  useEffect(() => {
    fetch("/order_items_by_order")
    .then((r) => {
      if (r.status === 401) {
        fetch("/orders", {method: "POST"})
        .then((r) => {
          if (r.status === 201) {
            // Order was created, no items yet
            setCustomerOrderItems([])
          }
        })
      } else if (r.status === 200) {
          return r.json()
      }
  })
    // .then((r) => {
    //     if (r.status === 201) {
    //         // Order was created, no items yet
    //         setCustomerOrderItems([])
    //     } else {
    //         return r.json()
    //     }
    // })
    .then((data) => setCustomerOrderItems(data))

}, [loggedInUser, abortStripe])

  function handleAddOrderItem(newOrderItem) {
    console.log(newOrderItem)
    const exists = customerOrderItems.filter((item) => {
      return item.id === newOrderItem.id
    })
    if (exists.length === 0) {
      const addOrderItem = [...customerOrderItems, newOrderItem]
      setCustomerOrderItems(addOrderItem)
    } else if (exists.length > 0) {
      updateCustomerOrderItems(newOrderItem)
    }
  }

  function updateCustomerOrderItems(updatedItem) {
    const updatedOrderItems = customerOrderItems.map((item) => 
      item.id === updatedItem.id ? updatedItem : item
    )
    setCustomerOrderItems(updatedOrderItems)
  }

console.log(loggedInUser)
console.log(customerOrderItems)
 
  const { data, error, isLoading, refetch } = useFetchItemsQuery();
  
  function refreshInventory() {
    // refetching after order submitted to update inventory
    refetch()

  }

  let sortedItems
  if (sortBy === "Best Match") {
    sortedItems = data ? [...data].sort((item1, item2) => item1.id - item2.id) : [];
  } else if (sortBy === "Price: Low to High") {
    sortedItems = data ? [...data].sort((item1, item2) => item1.price - item2.price) : [];
  } else if (sortBy === "Price: High to Low") {
    sortedItems = data ? [...data].sort((item1, item2) => item2.price - item1.price) : [];
  }

  const searchedData = sortedItems ? sortedItems.filter((item) => 
    item.name.toLowerCase().includes(search.toLowerCase())) : []

  const itemAppliances = searchedData ? searchedData.filter((item) => {
      return item.category === "appliances"
  }) : []

    const itemTools = searchedData ? searchedData.filter((item) => {
      return item.category === "tools"
  }) : []

  const itemAccessories = searchedData ? searchedData.filter((item) => {
    return item.category === "accessories"
  }) : []

  return (
    <Router>
      <NavBar 
        setLoggedInUser={setLoggedInUser}
        loggedInUser={loggedInUser}
        customerOrderItems={customerOrderItems}
        setSearch={setSearch}
        setSortBy={setSortBy} />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <CustomerFormLayout
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser} />
      </Route>
      <Route path="/appliances">
        <Appliances 
          loggedInUser={loggedInUser}
          customerOrderItems={customerOrderItems}
          categoryData={itemAppliances}
          search={search}
          setSearch={setSearch}
          setSortBy={setSortBy}
          handleAddOrderItem={handleAddOrderItem}
           />
      </Route>
      <Route path="/tools">
        <Tools 
          loggedInUser={loggedInUser}
          customerOrderItems={customerOrderItems}
          categoryData={itemTools}
          search={search}
          setSearch={setSearch}
          setSortBy={setSortBy}
          handleAddOrderItem={handleAddOrderItem}
           />
      </Route>
      <Route path="/accessories">
        <Accessories 
          loggedInUser={loggedInUser}
          customerOrderItems={customerOrderItems}
          categoryData={itemAccessories}
          search={search}
          setSearch={setSearch}
          setSortBy={setSortBy}
          handleAddOrderItem={handleAddOrderItem}
           />
      </Route>
      <Route path="/account">
        <CustomerAcctLayout 
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser} />
      </Route>
      <Route path="/orders/:orderId">
        {({ match }) => (
          <OrderDetails
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
            orderId={match.params.orderId}
          />
        )}
      </Route>
      <Route path="/orders">
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
      <Route path="/cart">
        <Cart 
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}
          customerOrderItems={customerOrderItems}
          setCustomerOrderItems={setCustomerOrderItems}
          updateCustomerOrderItems={updateCustomerOrderItems}
          refreshInventory={refreshInventory} />
      </Route>
      <Route path ="/about">
        <About />
      </Route>
      <Route path ="/success">
        <Success 
          setCustomerOrderItems={setCustomerOrderItems}
          refreshInventory={refreshInventory} />
      </Route>
      <Route path ="/cancel">
        <Cancel 
          abortStripe={abortStripe} 
          setAbortStripe={setAbortStripe} />
      </Route>
    </Switch>
    <Footer />
  </Router>
);
}

export default App;
