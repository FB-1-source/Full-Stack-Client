import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Register() {
  let history = useHistory();
  const initalValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4)
      .max(15)
      .required("You have to enter a username!"),
    password: Yup.string()
      .min(4)
      .max(20)
      .required("You have to enter a password!"),
  });

  const submit = (data) => {
    Axios.post("https://full-stack-api-sportytalk.herokuapp.com/auth", data).then(() => {
      history.push("/login");
    });
  };

  return (
    <div className="mainform">
      <Formik
        initialValues={initalValues}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="form">
            <label>Username:</label>
            <ErrorMessage name="username" component="span" />
            <Field
              className="createuser"
              name="username"
              placeholder="Username..."
            />
            <label>Password</label>
            <ErrorMessage name="password" component="span" />
            <Field
              className="createtitle"
              type="password"
              name="password"
              placeholder="Password..."
            />
            <button className="btn" type="submit">
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
