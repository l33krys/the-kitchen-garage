import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message, Grid, Segment } from 'semantic-ui-react'

export const EditBillingAddress = ({ loggedInUser, setLoggedInUser, showEditBilling, setShowEditBilling }) => {

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
            // history.push("/myaccount")
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
                // style={{width: "12em" }}
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
                // style={{width: "8em"}}
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
                // style={{width: "8em"}}
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

// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { Button, Form, Message, Grid, Segment } from 'semantic-ui-react'

// export const EditBillingAddress = ({ loggedInUser, setLoggedInUser }) => {

//     const history = useHistory();

//   const formSchema = yup.object().shape({
//     street: yup.string().required(),
//     city: yup.string().required(),
//     state: yup.string().required(),
//     zip_code: yup.string().required(),
//   });

//   const formik = useFormik({
//     initialValues: {
//         street: loggedInUser == null || loggedInUser.billing_address == null ? "" : loggedInUser.billing_address.street,
//         city: loggedInUser == null || loggedInUser.billing_address == null ? "" : loggedInUser.billing_address.city,
//         state: loggedInUser == null || loggedInUser.billing_address == null ? "" : loggedInUser.billing_address.state,
//         zip_code: loggedInUser == null || loggedInUser.billing_address == null ? "" : loggedInUser.billing_address.zip_code,
//       },
//     validationSchema: formSchema,
//     onSubmit: (values) => {
//         const address = {
//             street: values.street,
//             city: values.city,
//             state: values.state,
//             zip_code: values.zip_code,
//                   }
//         console.log(address)

//       fetch(`/addresses`, {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             street: values.street,
//             city: values.city,
//             state: values.state,
//             zip_code: values.zip_code
//           }, null, 2),
//       })
//       .then((r) => r.json())
//       .then((address) => {
//         console.log(address.id)
//         console.log(loggedInUser.id)
//         fetch(`/customers/${loggedInUser.id}`, {
//             method: "PATCH",
//             mode: "cors",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 billing_address_id: address.id
//             })
//         })
//         .then((r) => r.json())
//         .then((customer) => {
//             setLoggedInUser(customer)
//             history.push("/myaccount")
//       })
//       })
//     },
//   });

//   return (
//     <>
//     {loggedInUser ?
//     <div
//       style={{
//         backgroundColor: "#576F72",
//         margin: "30px",
//         paddingTop: "15px",
//         paddingBottom: "15px",
//       }}
//     >
//       <h3 style={{ margin: "30px", color: "#F6F1F1", textAlign: "center" }}>
//         Edit Billing Address
//       </h3>

//       <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
//             <Form.Field>
//               <label htmlFor="street" style={{ color: "#F6F1F1" }}>
//                 Street
//               </label>
//               <input
//                 id="street"
//                 name="street"
//                 onChange={formik.handleChange}
//                 value={formik.values.street}
//               />
//               <p style={{ color: "white" }}> {formik.errors.street}</p>
//             </Form.Field>
//             <Form.Field>
//               <label htmlFor="city" style={{ color: "#F6F1F1" }}>
//                 City
//               </label>
//               <input
//                 id="city"
//                 name="city"
//                 onChange={formik.handleChange}
//                 value={formik.values.city}
//               />
//               <p style={{ color: "white" }}> {formik.errors.city}</p>
//             </Form.Field>
//             <Form.Field>
//               <label htmlFor="state" style={{ color: "#F6F1F1" }}>
//                 State
//               </label>
//               <input
//                 id="state"
//                 name="state"
//                 onChange={formik.handleChange}
//                 value={formik.values.state}
//               />
//               <p style={{ color: "white" }}> {formik.errors.state}</p>
//             </Form.Field>
//             <Form.Field>
//               <label htmlFor="zip_code" style={{ color: "#F6F1F1" }}>
//                 Zip Code
//               </label>
//               <input
//                 id="zip_code"
//                 name="zip_code"
//                 onChange={formik.handleChange}
//                 value={formik.values.zip_code}
//               />
//               <p style={{ color: "white" }}> {formik.errors.zip_code}</p>
//             </Form.Field>
//         <br/>
//         <br/>
//         <Button style={{ background: "white" }} type="submit">
//           Save Changes
//         </Button>
//       </Form>
//     </div>
//     :
//     "Loading..."}
//     </>
//   );
// };

// export default EditBillingAddress;
