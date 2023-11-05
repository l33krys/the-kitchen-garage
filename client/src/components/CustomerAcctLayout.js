import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import MyAccount from './MyAccount'
import CustomerAddress from './CustomerAddress'


function CustomerAcctLayout({ loggedInUser, setLoggedInUser }) {

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column verticalAlign="top">
          <MyAccount 
              setLoggedInUser={setLoggedInUser}
              loggedInUser={loggedInUser} />
        </Grid.Column>
        <Grid.Column verticalAlign='top'>
        <CustomerAddress 
              setLoggedInUser={setLoggedInUser}
              loggedInUser={loggedInUser} />
        </Grid.Column>
      </Grid>
      <Divider vertical>and</Divider>
    </Segment>
  )

}

export default CustomerAcctLayout;