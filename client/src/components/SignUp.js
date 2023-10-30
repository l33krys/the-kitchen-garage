import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message, Grid, Segment } from 'semantic-ui-react'
import { useAddCustomerMutation } from "../store";

export const SignUp = ({ setUserLoggedIn, userLoggedIn }) => {
    const [addCustomer, results] = useAddCustomerMutation();

    const [showSignUpSuccess, setShowSignUpSuccess] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

  const formSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().required("Must enter a valid email"),
    password: yup.string().required("Must enter a password with 8 characters and include at least 1 letter and 1 number"),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  useEffect(() => {
    if (showSignUpSuccess) {
      const timer = setTimeout(() => {
        setShowSignUpSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSignUpSuccess]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
        const customer = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    password: values.password
                  }
        console.log(customer)
      addCustomer(customer)
    //   fetch("/customers", {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         first_name: values.first_name,
    //         last_name: values.last_name,
    //         email: values.email,
    //         password: values.password
    //       }, null, 2),
    //   })
      // .then((r) => r.json())
      // .then((data) => console.log("status: ", data.status, data))
    //   .then((res) => {
    //     if (res.status == 200) {
    //       console.log(res)
    //       console.log("you are now logged in")
    //       resetForm();
    //     }
    //     if (res.status === 401){
    //       setShowErrorMessage(true)
    //       setShowSignUpSuccess(false)
    //     }
    //   });
    },
  });

  return (
    <div
      style={{
        backgroundColor: "#576F72",
        margin: "30px",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <h3 style={{ margin: "30px", color: "#F6F1F1", textAlign: "center" }}>
        Create an Account
      </h3>

      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <Form.Field>
              <label htmlFor="first_name" style={{ color: "#F6F1F1" }}>
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
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
              />
              <p style={{ color: "white" }}> {formik.errors.last_name}</p>
            </Form.Field>

            <Form.Field>
              <label htmlFor="email" style={{ color: "#F6F1F1" }}>
                Email
              </label>
              <input
                id="email-signup"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                // style={{ position: "absolute", left: "50px",  width: "520px", marginBottom: "0px" }}
              />
              <p style={{ color: "white" }}> {formik.errors.email}</p>
            </Form.Field>
            <Form.Field>
              <label htmlFor="password" style={{ color: "#F6F1F1" }}>
                Password
              </label>
              <Form.Input
                id="password-signup"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                icon='lock'
                iconPosition='left'
              />

              <p style={{ color: "white" }}> {formik.errors.password}</p>
            </Form.Field>
            <Form.Field>
              <label htmlFor="confirm_password" style={{ color: "#F6F1F1" }}>
                Confirm Password
              </label>
              <Form.Input
                id="confirm_password"
                type="password"
                name="confirm_password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                icon='lock'
                iconPosition='left'
              />
              <p style={{ color: "white" }}>
                {" "}
                {formik.errors.confirm_password}
              </p>
            </Form.Field>
        <br/>
        <br/>
        <Button style={{ background: "white" }} type="submit">
          Create Account
        </Button>
        {showErrorMessage ? (
          <Message
            style={{
              margin: "auto",
              width: "350px",
              marginTop: "20px",
              color: "#E06469",
            }}
            header="Attention Required"
            content="Input(s) Invalid"
          ></Message>
        ) : (
          ""
        )}
        {showSignUpSuccess ? (
          <Message
            style={{
              margin: "auto",
              width: "350px",
              marginTop: "20px",
              color: "#19A7CE",
            }}
            header="Success: You're now logged in"
          />
        ) : (
          ""
        )}
      </Form>
    </div>
  );
};

export default SignUp;
