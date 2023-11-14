import React from "react";
import { Grid } from 'semantic-ui-react'
import ItemContainer from "./ItemContainer";
import ItemSort from "./ItemSort";

function Tools({ setSearch, setSortBy, handleAddOrderItem, loggedInUser, customerOrderItems, categoryData, search }) {

  return (
    
    <div style={{ marginTop: "20px", marginLeft: "100px"}}>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column  verticalAlign="middle">
            <h1 className="category-headers">Tools</h1>
          </Grid.Column>
          <Grid.Column>
            <ItemSort 
              search={search}
              setSearch={setSearch}
              setSortBy={setSortBy}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ItemContainer 
        loggedInUser={loggedInUser} 
        customerOrderItems={customerOrderItems}
        categoryData={categoryData}
        handleAddOrderItem={handleAddOrderItem}  
        />
    </div>
    
  )
}

export default Tools;