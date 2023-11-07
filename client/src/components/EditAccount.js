import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message, Grid, Segment } from 'semantic-ui-react'

export const EditAccount = ({ loggedInUser, setLoggedInUser, setShowEditAccount, showEditAccount }) => {
    const history = useHistory();

  const formSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().required("Must enter a valid email"),
    phone_number: yup.string().required("Must use format XXX-XXX-XXXX"),
    password: yup.string().required("Must enter a password with 8 characters and include at least 1 letter and 1 number"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    // confirmPassword: yup.string().when('password', (password, field) =>
    // password ? field.required().oneOf([yup.ref('password')]) : field
  //  )
  });

  const formik = useFormik({
    initialValues: {
      first_name: loggedInUser ? loggedInUser.first_name: "",
      last_name: loggedInUser ? loggedInUser.last_name : "",
      email: loggedInUser ? loggedInUser.email : "",
      phone_number: loggedInUser ? loggedInUser.phone_number : "",
      password: "******",
      confirmPassword: "******"
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        const customer = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    phone_number: values.phone_number,
                    password_hash: values.password
                  }
        console.log(customer)
      fetch(`/customers/${loggedInUser.id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone_number: values.phone_number,
            password: values.password
          }, null, 2),
      })
      .then((r) => {
        if (r.ok) {
          // history.push("/account")
          setShowEditAccount(false)
          r.json()
          .then((user) => {
            setLoggedInUser(user)         
          }) 
          }
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
              <label htmlFor="first_name" style={{ color: "#F6F1F1" }}>
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                style={{width: "15em" }}
              />
              <p style={{ color: "white" }}> {formik.errors.first_name}</p>
            </Form.Field>
            <Form.Field>
              <label htmlFor="last_name" style={{ color: "#F6F1F1" }}>
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                style={{width: "15em" }}
              />
              <p style={{ color: "white" }}> {formik.errors.last_name}</p>
            </Form.Field>
            </Form.Group>
            <Form.Group inline>
            <Form.Field>
              <label htmlFor="email" style={{ color: "#F6F1F1" }}>
                Email
              </label>
              <input
                id="email-edit-account"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                style={{width: "15em" }}
              />
              <p style={{ color: "white" }}> {formik.errors.email}</p>
            </Form.Field>
            <Form.Field>
              <label htmlFor="phone_number" style={{ color: "#F6F1F1" }}>
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
                style={{width: "15em" }}
              />
              <p style={{ color: "white" }}> {formik.errors.phone_number}</p>
            </Form.Field>
            </Form.Group>
            <Form.Group inline>
            <Form.Field>
              <label htmlFor="password" style={{ color: "#F6F1F1" }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="********"
                style={{width: "15em" }}
              />
              <p style={{ color: "white" }}> {formik.errors.password}</p>
            </Form.Field>
            <Form.Field>
              <label htmlFor="confirmPassword" style={{ color: "#F6F1F1" }}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder="********"
                style={{width: "15em" }}
              />
              <p style={{ color: "white" }}> {formik.errors.confirmPassword}</p>
            </Form.Field>
            </Form.Group>
            <Form.Group inline style={{ margin: "auto" }}>
            <Button.Group style={{ margin: "auto" }} >
              <Button style={{ height: "2.5em" }}color="black" type="submit">
                Save Changes
              </Button>
              <Button.Or />
              <Button style={{ height: "2.5em" }} onClick={(e) => setShowEditAccount(false)} >
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

export default EditAccount;


// export const EditAccount = ({ loggedInUser, setLoggedInUser }) => {
//   const history = useHistory();

// const formSchema = yup.object().shape({
//   first_name: yup.string().required("First name is required"),
//   last_name: yup.string().required("Last name is required"),
//   email: yup.string().required("Must enter a valid email"),
//   phone_number: yup.string().required("Must use format XXX-XXX-XXXX"),
//   password: yup.string().required("Must enter a password with 8 characters and include at least 1 letter and 1 number"),
//   confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
// });

// const formik = useFormik({
//   initialValues: {
//     first_name: loggedInUser ? loggedInUser.first_name: "",
//     last_name: loggedInUser ? loggedInUser.last_name : "",
//     email: loggedInUser ? loggedInUser.email : "",
//     phone_number: loggedInUser ? loggedInUser.phone_number : "",
//     password: "****"
//   },
//   validationSchema: formSchema,
//   onSubmit: (values) => {
//       const customer = {
//                   first_name: values.first_name,
//                   last_name: values.last_name,
//                   email: values.email,
//                   phone_number: values.phone_number,
//                   password_hash: values.password
//                 }
//       console.log(customer)
//     fetch(`/customers/${loggedInUser.id}`, {
//       method: "PATCH",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//           first_name: values.first_name,
//           last_name: values.last_name,
//           email: values.email,
//           phone_number: values.phone_number,
//           password: values.password
//         }, null, 2),
//     })
//     .then((r) => {
//       if (r.ok) {
//         history.push("/account")
//         r.json()
//         .then((user) => {
//           setLoggedInUser(user)         
//         }) 
//         }
//     })
//   },
// });

// return (
//   <>
//   {loggedInUser ?
//   <div
//     style={{
//       backgroundColor: "#576F72",
//       margin: "30px",
//       paddingTop: "15px",
//       paddingBottom: "15px",
//     }}
//   >
//     <h3 style={{ margin: "30px", color: "#F6F1F1", textAlign: "center" }}>
//       Edit My Account
//     </h3>

//     <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
//           <Form.Field>
//             <label htmlFor="first_name" style={{ color: "#F6F1F1" }}>
//               First Name
//             </label>
//             <input
//               id="first_name"
//               name="first_name"
//               onChange={formik.handleChange}
//               value={formik.values.first_name}
//             />
//             <p style={{ color: "white" }}> {formik.errors.first_name}</p>
//           </Form.Field>
//           <Form.Field>
//             <label htmlFor="last_name" style={{ color: "#F6F1F1" }}>
//               Last Name
//             </label>
//             <input
//               id="last_name"
//               name="last_name"
//               onChange={formik.handleChange}
//               value={formik.values.last_name}
//             />
//             <p style={{ color: "white" }}> {formik.errors.last_name}</p>
//           </Form.Field>
//           <Form.Field>
//             <label htmlFor="email" style={{ color: "#F6F1F1" }}>
//               Email
//             </label>
//             <input
//               id="email-edit-account"
//               name="email"
//               onChange={formik.handleChange}
//               value={formik.values.email}
//             />
//             <p style={{ color: "white" }}> {formik.errors.email}</p>
//           </Form.Field>
//           <Form.Field>
//             <label htmlFor="phone_number" style={{ color: "#F6F1F1" }}>
//               Phone Number
//             </label>
//             <input
//               id="phone_number"
//               name="phone_number"
//               onChange={formik.handleChange}
//               value={formik.values.phone_number}
//             />
//             <p style={{ color: "white" }}> {formik.errors.phone_number}</p>
//           </Form.Field>
//           <Form.Field>
//             <label htmlFor="password" style={{ color: "#F6F1F1" }}>
//               Password
//             </label>
//             <input
//               id="password-edit"
//               name="password"
//               type="password"
//               onChange={formik.handleChange}
//               value={formik.values.password}
//             />
//             <p style={{ color: "white" }}> {formik.errors.password}</p>
//           </Form.Field>
//           <Form.Field>
//             <label htmlFor="password" style={{ color: "#F6F1F1" }}>
//               Password
//             </label>
//             <input
//               id="password-edit-confirm"
//               name="password"
//               type="password"
//               onChange={formik.handleChange}
//               value={formik.values.password}
//             />
//             <p style={{ color: "white" }}> {formik.errors.password}</p>
//           </Form.Field>
//       <br/>
//       <br/>
//       <Button style={{ background: "white" }} type="submit">
//         Save Changes
//       </Button>        
//     </Form>
//   </div>
//   :
//   "Loading..."}
//   </>
// );
// };

// export default EditAccount;