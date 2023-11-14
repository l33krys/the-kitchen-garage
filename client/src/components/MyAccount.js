import React, { useState } from 'react'
import { useHistory } from "react-router";
import { Header, Table, Button, Confirm } from 'semantic-ui-react';
import EditAccount from './EditAccount';

function MyAccount({ loggedInUser, setLoggedInUser }) {

    const [showEditAccount, setShowEditAccount] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const history = useHistory();

    function handleEditInfo() {
        setShowEditAccount(!showEditAccount)
    } 

    function handleCancelDelete() {
      setConfirmDelete(false)
    }

    function handleDeleteAccount() {
        console.log(loggedInUser.id)
        fetch(`http://localhost:5555/customers/${loggedInUser.id}`, {
            method: "DELETE"
        })
        .then((r) => {
            if (true) {
              fetch("/logout", {
                method: "DELETE",
              })
              setLoggedInUser(null)
              history.push("/")
            }
        })
    }

    return (
      <>
      {loggedInUser ?
        <Table style={{ margin: "auto", paddingTop: "15px", paddingBottom: "15px" }} basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>My Info</Table.HeaderCell>
            <Table.HeaderCell><Button onClick={handleEditInfo}>Edit</Button></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' >
                <Header.Content>
                  First Name
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{loggedInUser.first_name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' >
                <Header.Content>
                  Last Name
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{loggedInUser.last_name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' >
                <Header.Content>
                  Email
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{loggedInUser.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' >
                <Header.Content>
                  Phone Number
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{loggedInUser.phone_number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' >
                <Header.Content>
                  Password
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>******</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            </Table.Cell>
            <Table.Cell>
            <Button onClick={(e) => setConfirmDelete(true)}>Delete Account</Button>
            {/* <Button onClick={handleDeleteAccount}>Delete Account</Button> */}
            </Table.Cell>
          </Table.Row>
          {showEditAccount ?
          <Table.Row>
            <Table.Cell colSpan="3">
            <EditAccount
              loggedInUser={loggedInUser} 
              setLoggedInUser={setLoggedInUser}
              showEditAccount={showEditAccount}
              setShowEditAccount={setShowEditAccount} />
            </Table.Cell>
          </Table.Row>
          : null}
        </Table.Body>
      </Table>
      :
      "Loading..."}
        <Confirm
          size={"tiny"}
          open={confirmDelete}
          content="Are you sure you want to delete your account?"
          onCancel={handleCancelDelete}
          onConfirm={handleDeleteAccount}
        />
  </>
    )
}

export default MyAccount;
