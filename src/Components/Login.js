import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Authcontext } from "../Authcheck/Authcontext";

function Login() {
  const initalValues = {
    username: "",
    password: "",
  };

  const { Authstate, setAuthState } = useContext(Authcontext);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("You have to enter a username!"),
    password: Yup.string().required("You have to enter a password!"),
  });

  const Login = (data) => {
    Axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        setAuthState({ ...Authstate, status: true });
        window.location.assign("/home");
      }
    });
  };

  return (
    <div className="mainform">
      <Formik
        initialValues={initalValues}
        onSubmit={Login}
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
              Login
            </button>
            <div className="reglink">
              <Link to="/register">
                {" "}
                Don't have an account? Click here to sign up
              </Link>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
