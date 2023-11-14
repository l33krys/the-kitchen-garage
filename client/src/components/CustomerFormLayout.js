import React from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'
import Login from './Login'
import SignUp from './SignUp'

function CustomerFormLayout({ loggedInUser, setLoggedInUser }) {
  
    return (

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
        <Divider vertical>or</Divider>
      </Segment>
    )
}
export default CustomerFormLayout;