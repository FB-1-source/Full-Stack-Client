import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Authcontext } from "../Authcheck/Authcontext";

function Newpost() {
  let history = useHistory();
  const initalValues = {
    title: "",
    textOfPost: "",
    username: "",
  };

  const { Authstate } = useContext(Authcontext);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You have to enter a title!"),
    textOfPost: Yup.string().required("You have to enter a post!"),
    username: Yup.string().min(4).max(15).required(),
  });
  const submit = (data) => {
    Axios.post("https://full-stack-api-sportytalk.herokuapp.com/posts", data).then((response) => {
      history.push("/home");
    });
  };

  return (
    <div>
      {Authstate.status ? (
        <div className="mainform">
          <Formik
            initialValues={initalValues}
            onSubmit={submit}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="form">
                <label>Title:</label>
                <ErrorMessage name="title" component="span" />
                <Field
                  className="createtitle"
                  name="title"
                  placeholder="Title..."
                />
                <label>Post:</label>
                <ErrorMessage name="textOfPost" component="span" />
                <Field
                  className="createpost"
                  name="textOfPost"
                  placeholder="Post..."
                />
                <label>Username:</label>
                <ErrorMessage name="username" component="span" />
                <Field
                  className="createuser"
                  name="username"
                  placeholder="User..."
                />
                <button className="btn" type="submit">
                  Create Post
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      ) : (
        <div className="newlog">
          Sorry, you need to login in order to access this page
        </div>
      )}
    </div>
  );
}

export default Newpost;
