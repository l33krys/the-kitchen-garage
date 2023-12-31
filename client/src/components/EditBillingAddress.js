import React from "react";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form } from 'semantic-ui-react'

export const EditBillingAddress = ({ loggedInUser, setLoggedInUser, setShowEditBilling }) => {

    const history = useHistory();

  const formSchema = yup.object().shape({
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip_code: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
        street: loggedInUser == null || loggedInUser.billing_address == null ? "" : loggedInUser.billing_address.street,
        city: loggedInUser == null || loggedInUser.billing_address == null ? "" : loggedInUser.billing_address.city,
        state: loggedInUser == null || loggedInUser.billing_address == null ? "" : loggedInUser.billing_address.state,
        zip_code: loggedInUser == null || loggedInUser.billing_address == null ? "" : loggedInUser.billing_address.zip_code,
      },
    validationSchema: formSchema,
    onSubmit: (values) => {
        const address = {
            street: values.street,
            city: values.city,
            state: values.state,
            zip_code: values.zip_code,
                  }
        console.log(address)

      fetch(`/addresses`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            street: values.street,
            city: values.city,
            state: values.state,
            zip_code: values.zip_code
          }, null, 2),
      })
      .then((r) => r.json())
      .then((address) => {
        console.log(address.id)
        console.log(loggedInUser.id)
        fetch(`/customers/${loggedInUser.id}`, {
            method: "PATCH",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                billing_address_id: address.id
            })
        })
        .then((r) => r.json())
        .then((customer) => {
            setLoggedInUser(customer)
            setShowEditBilling(false)
      })
      })
    },
  });

  return (
    <>
    {loggedInUser ?
    <div
      style={{
        backgroundColor: "#576F72",
        margin: "30px",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
<Form size="small" key="small" onSubmit={formik.handleSubmit} style={{ marginLeft: "30px", marginRight: "30px" }}>
        <Form.Group inline>
            <Form.Field>
              <label htmlFor="street" style={{ color: "#F6F1F1" }}>
                Street
              </label>
              <input
                id="street"
                name="street"
                onChange={formik.handleChange}
                value={formik.values.street}
                style={{ float: "left" }}
              />
              <p style={{ color: "white" }}> {formik.errors.street}</p>
            </Form.Field>
            <Form.Field>
              <label htmlFor="city" style={{ color: "#F6F1F1" }}>
                City
              </label>
              <input
                id="city"
                name="city"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              <p style={{ color: "white" }}> {formik.errors.city}</p>
            </Form.Field>
            </Form.Group>
            <Form.Group inline >
            <Form.Field>
              <label htmlFor="state" style={{ color: "#F6F1F1" }}>
                State
              </label>
              <input
                id="state"
                name="state"
                onChange={formik.handleChange}
                value={formik.values.state}
              />
              <p style={{ color: "white" }}> {formik.errors.state}</p>
            </Form.Field>
            <Form.Field>
              <label htmlFor="zip_code" style={{ color: "#F6F1F1" }}>
                Zip Code
              </label>
              <input
                id="zip_code"
                name="zip_code"
                onChange={formik.handleChange}
                value={formik.values.zip_code}
              />
              <p style={{ color: "white" }}> {formik.errors.zip_code}</p>
            </Form.Field>
            </Form.Group>
            <Form.Group inline style={{ margin: "auto" }}>
              <Button.Group style={{ margin: "auto" }}>
              <Button color="black" type="submit">
                Save Changes
              </Button>
              <Button.Or />
              <Button onClick={(e) => setShowEditBilling(false)} >
                Cancel Changes
              </Button>
              </Button.Group>
            </Form.Group>
      </Form>
    </div>
    :
    "Loading..."}
    </>
  );
};

export default EditBillingAddress;