import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import Login from './Login'
import SignUp from './SignUp'

const CustomerFormLayout = ({ loggedInUser, setLoggedInUser }) => (
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Login 
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}/>
      </Grid.Column>
      <Grid.Column verticalAlign='middle'>
        <SignUp 
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}/>
      </Grid.Column>
    </Grid>
    <Divider vertical></Divider>
  </Segment>
)

export default CustomerFormLayout;