import React, { useEffect, useState } from "react";
import { Grid } from 'semantic-ui-react'
import ItemContainer from "./ItemContainer";
import ItemSort from "./ItemSort";

function Accessories({ loggedInUser, customerOrderItems, categoryData, search, setSearch, sortBy, setSortBy, handleSortBy, handleAddOrderItem }) {

  return (
    
    <div  style={{ marginTop: "20px", marginLeft: "100px"}}>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column  verticalAlign="middle">
          <h1>Accessories</h1>
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
        handleSortBy={handleSortBy}
        handleAddOrderItem={handleAddOrderItem}  />
    </div>
    
  )
}

export default Accessories;