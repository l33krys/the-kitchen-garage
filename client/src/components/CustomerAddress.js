import React, { useState } from 'react'
import { useHistory } from "react-router";
import { Header, Image, Table, Button } from 'semantic-ui-react'
import EditBillingAddress from './EditBillingAddress';
import EditShippingAddress from './EditShippingAddress';

function CustomerAddress({ loggedInUser, setLoggedInUser }) {

    const [showEditBilling, setShowEditBilling] = useState(false)
    const [showEditShipping, setShowEditShipping] = useState(false)
    const history = useHistory();

    function handleEditAddress(type) {
        if (type === "billing") {
            // history.push("/edit_billing_address")
            setShowEditBilling(!showEditBilling)
            setShowEditShipping(false)
        } else if (type === "shipping") {
            // history.push("/edit_shipping_address")
            setShowEditShipping(!showEditShipping)
            setShowEditBilling(false)
        }
    }

    return (

      <>
      {loggedInUser ?
        <Table style={{ margin: "auto", paddingTop: "15px", paddingBottom: "15px" }} basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>My Addresses</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' >
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
          {showEditBilling ?
          <Table.Row>
            <Table.Cell colSpan="3">
            <EditBillingAddress 
              loggedInUser={loggedInUser} 
              setLoggedInUser={setLoggedInUser}
              showEditBilling={showEditBilling}
              setShowEditBilling={setShowEditBilling} />
            </Table.Cell>
          </Table.Row>
          : null}
          
          <Table.Row>
            <Table.Cell>
              <Header as='h4' >
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
          {showEditShipping ?
          <Table.Row>
            <Table.Cell colSpan="3">
            <EditShippingAddress 
              loggedInUser={loggedInUser} 
              setLoggedInUser={setLoggedInUser}
              showEditShipping={showEditShipping}
              setShowEditShipping={setShowEditShipping} />
            </Table.Cell>
          </Table.Row>
          : null}
        </Table.Body>
      </Table>
      :
      "Loading..."}
      </>
    )
}

export default CustomerAddress;
