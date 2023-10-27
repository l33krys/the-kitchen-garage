import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function Login() {

  return (

    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' style={{ color: "#576F72"}} textAlign='center'>
          Customer Login
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button style={{ backgroundColor: "#576F72", color: "#F0EBE3"}} fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New customer? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>

  )

}

export default Login;