import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import MyAccount from './MyAccount'
import CustomerAddress from './CustomerAddress'


const CustomerAcctLayout = ({ loggedInUser, setLoggedInUser }) => (
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <MyAccount 
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}/>
      </Grid.Column>
      <Grid.Column verticalAlign='middle'>
      <CustomerAddress 
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}/>
      </Grid.Column>
    </Grid>
    <Divider vertical></Divider>
  </Segment>
)

export default CustomerAcctLayout;