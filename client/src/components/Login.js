import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message } from 'semantic-ui-react'
import SignUp from "./SignUp";

export const Login = ({ guests, parties, refreshPage, setRefreshPage }) => {
  const [showLoginSuccess, setShowLoginSuccess] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  function goToSignup() {
    <SignUp />
  }

  const formSchema = yup.object().shape({
    email: yup.string().required("Must enter a valid email"),
    password: yup.string().required("Must enter a password with 8 characters and include at least 1 letter and 1 number"),
  });

  useEffect(() => {
    if (showLoginSuccess) {
      const timer = setTimeout(() => {
        setShowLoginSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showLoginSuccess]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values)
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
      // .then((r) => r.json())
      // .then((data) => console.log("status: ", data.status, data))
      .then((res) => {
        if (res.status == 200) {
          console.log(res)
          console.log("you are now logged in")
          resetForm();
        }
        if (res.status === 401){
          setShowErrorMessage(true)
          setShowLoginSuccess(false)
        }
      });
    },
  });

  return (
    <div style={{ backgroundColor: "#576F72", margin: "30px", paddingTop: "15px", paddingBottom: "15px" }}>
      <h3 style={{ margin: "30px", color:"#F6F1F1", textAlign: "center" }}>Customer Login</h3>

      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <Form.Field>
        <label htmlFor="email"style={{color: "#F6F1F1"}}>Email</label>
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          style={{ width: "250px", textAlign: "center" }}
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="password"style={{color: "#F6F1F1"}}>Password</label>
        <input
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          style={{ width: "250px", textAlign: "center" }}
        />
        <p style={{ color: "red" }}> {formik.errors.password}</p>
        </Form.Field>
        <Button style={{ background: "white" }} type="submit">Login</Button>
        {showErrorMessage ? <Message style={{ margin: "auto", width: "350px", marginTop: "20px", color: '#E06469'}} header="Attention Required" content="Input(s) Invalid"></Message> : ""}
        {showLoginSuccess ? <Message
        style={{ margin: "auto", width: "350px", marginTop: "20px", color: '#19A7CE'}}
                        header="Success: You're now logged in"
                      /> : ""}
        
      </Form>
      {/* <Button style={{ background: "white" }} as={Link} to="/signup">Sign Up</Button> */}
    </div>
  );
};

export default Login;
