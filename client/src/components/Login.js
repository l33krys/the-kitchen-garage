import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message } from 'semantic-ui-react'

export const Login = ({ setLoggedInUser }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().required("Must enter a valid email"),
    password: yup.string().required("Must enter a password with 8 characters and include at least 1 letter and 1 number"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: values.email,
            password: values.password
          }, null, 2),
      })
      .then((r) => {
        setIsLoading(false)
        if (r.ok) {
          history.push("/")
          r.json()
          .then((user) => {
            setLoggedInUser(user)
            setShowErrorMessage(false)
            // create new order if none saved; customer always has a working "saved" order
            fetch("/orders", {method: "POST"})           
          }) 
          } else {
            r.json().then((err) => {
              setErrors(err.errors)
              setShowErrorMessage(true)
            })
            
          }
      })
    },
  });


  return (
    <div style={{ backgroundColor: "#576F72", margin: "30px", paddingTop: "15px", paddingBottom: "15px" }}>
      <h3 style={{ margin: "30px", color:"#F6F1F1", textAlign: "center" }}>Customer Login</h3>

      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <Form.Field>
        <label htmlFor="email"style={{color: "#F6F1F1"}}>Email</label>
        <Form.Input
          id="email-login"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          style={{ width: "250px" }}
          icon="mail"
          iconPosition="left"
        />
        </Form.Field>
        <Form.Field>
        <label htmlFor="password"style={{color: "#F6F1F1"}}>Password</label>
        <Form.Input
          id="password-login"
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          style={{ width: "250px", textAlign: "center" }}
          icon='lock'
          iconPosition='left'
        />
        </Form.Field>
        <Button style={{ background: "white" }} type="submit">Login</Button>
        {showErrorMessage ? <Message style={{ margin: "auto", width: "350px", marginTop: "20px", color: '#E06469'}} header="Attention Required" content="Please check email and password"></Message> : ""}
      </Form>
    </div>
  );
};

export default Login;
