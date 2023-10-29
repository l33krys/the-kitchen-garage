import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import Login from './Login'
import SignUp from './SignUp'

const CustomerFormLayout = () => (
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
            <Login />
      </Grid.Column>
      <Grid.Column verticalAlign='middle'>
        <SignUp />
      </Grid.Column>
    </Grid>
    <Divider vertical></Divider>
  </Segment>
)

export default CustomerFormLayout;