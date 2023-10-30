import React from 'react'
import { useHistory } from "react-router";
import { Header, Image, Table, Button } from 'semantic-ui-react'

function CustomerAddress({ loggedInUser, setLoggedInUser }) {

    const history = useHistory();

    function handleEditAddress(type) {
        if (type === "billing") {
            history.push("/edit_address")
        } else if (type === "shipping") {
            history.push("/edit_shipping_address")
        }
    }

    return (
        <Table style={{ margin: "30px", paddingTop: "15px", paddingBottom: "15px" }} basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>My Addresses</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  Billing Address
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
                {loggedInUser.billing_address ? 
                    (<><p>{loggedInUser.billing_address.street}</p><p>{loggedInUser.billing_address.city}, {loggedInUser.billing_address.state} {loggedInUser.billing_address.zip_code}</p></>)
                    : ("")}    
            </Table.Cell>
            <Table.Cell>
                <Button onClick={(e) => handleEditAddress("billing")}>Edit</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  Shipping Address
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
                {loggedInUser.shipping_address ? 
                    (<><p>{loggedInUser.shipping_address.street}</p><p>{loggedInUser.shipping_address.city}, {loggedInUser.shipping_address.state} {loggedInUser.shipping_address.zip_code}</p></>)
                    : ("")}              
            </Table.Cell>
            <Table.Cell>
                <Button onClick={(e) => handleEditAddress("shipping")}>Edit</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    
    )
}

export default CustomerAddress;
