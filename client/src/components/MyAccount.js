import React from 'react'
import { useHistory } from "react-router";
import { Header, Image, Table, Button } from 'semantic-ui-react'

function MyAccount({ loggedInUser, setLoggedInUser, handleLogOutClick }) {

    const history = useHistory();

    function handleEditInfo() {
        history.push("/edit_account")
    } 

    function handleDeleteAccount() {
        console.log(loggedInUser.id)
        fetch(`http://localhost:5555/customers/${loggedInUser.id}`, {
            method: "DELETE"
        })
        .then((r) => {
            if (true) {
                setLoggedInUser(null)
                history.push("/")
            }
        })
    }

    return (
      <>
      {loggedInUser ?
        <Table style={{ margin: "30px", paddingTop: "15px", paddingBottom: "15px" }} basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>My Info</Table.HeaderCell>
            <Table.HeaderCell><Button onClick={handleEditInfo}>Edit</Button></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  First Name
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{loggedInUser.first_name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  Last Name
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{loggedInUser.last_name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  Email
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{loggedInUser.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  Phone Number
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{loggedInUser.phone_number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  Password
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>****</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            </Table.Cell>
            <Table.Cell>
            <Button onClick={handleDeleteAccount}>Delete Account</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      :
      "Loading..."}
  </>
    )
}

export default MyAccount;
