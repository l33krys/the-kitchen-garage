import React, { useEffect, useState } from "react";
import { Grid } from 'semantic-ui-react'
import ItemContainer from "./ItemContainer";
import ItemSort from "./ItemSort";


function Appliances({ loggedInUser, customerOrderItems, categoryData, search, setSearch, sortBy, setSortBy, handleSortBy }) {

  // useEffect(() => {
  //   fetch("http://localhost:5555/items")
  //   .then(r => r.json())
  //   .then((data) => setItems(data))
  // }, [])

  return (
    
    <div  style={{ marginTop: "20px", marginLeft: "100px"}}>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
          <h1>Appliances</h1>
          </Grid.Column>
          <Grid.Column>
            <ItemSort 
                  search={search}
                  setSearch={setSearch}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  handleSortBy={handleSortBy}/>
            </Grid.Column>
        </Grid.Row>
      </Grid>


      <ItemContainer 
        loggedInUser={loggedInUser} 
        customerOrderItems={customerOrderItems}
        categoryData={categoryData}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleSortBy={handleSortBy}  />
    </div>
    
  )
}

export default Appliances;