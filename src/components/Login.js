import React, { Component, useState } from "react";
import { Formik } from "formik";
import {
  signIn,
  hasSignIn,
  isVerified,
  sendVerificationLink,
  signUp,
  getEmail
} from "../firebase/FirebaseUitls";
import "../App.css";
import { Redirect, Link } from "react-router-dom";
import firebase from "@firebase/app";

function Signup(props) {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const error = {};
        setSubmitting(true);
        console.log(values.email, values.password);
        await signUp(values.email, values.password)
          .then(() => {
            if (!isVerified()) {
              sendVerificationLink();
              const username = values.username
              if (
                firebase.auth().currentUser !== undefined &&
                firebase.auth().currentUser !== ""
              ) {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(firebase.auth().currentUser.uid)
                  .set({ username, admin: false });
              }
              setSubmitting(false);
              props.onSubmit();
            }
          })
          .catch(function(err) {
            var errorCode = err.code;
            var errorMessage = err.message;
            alert(errorCode + " " + errorMessage);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
        /* and other goodies */
      }) => (
        <form>
          <div className="form-row">
            <label>FULL NAME</label>
            <input
              type="text"
              name="username"
              className="input-box"
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-row">
            <label>PASSWORD</label>
            <input
              className="input-box"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
          </div>
          <div className="form-row">
            <label>E-MAIL</label>
            <input
              className="input-box"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
          </div>
          <div className="term">
            <input className="checkbox" type="checkbox" /> I agree to all
            statements in
            <a className="term-service" href="http://www.google.com">
              terms of service
            </a>
          </div>
          <button
            type="submit"
            className="bottom-button"
            disabled={isSubmitting}
            onClick={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Sign Up
          </button>
          <a className="already-member">I'm already a member</a>
        </form>
      )}
    </Formik>
  );
}

class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          const errors = {};
          if (!values.password) {
            errors.password = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const error = {};
          setSubmitting(true);
          signIn(values.email, values.password)
            .then(() => {
              this.props.onSubmit();
            })
            .catch(function(err) {
              var errorCode = err.code;
              var errorMessage = err.message;
              // TODO: replace alert with state text
              alert(errorCode, errorMessage);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form>
            <div className="form-row">
              <div className="form-row">
                <label>E-MAIL</label>
                <input
                  className="input-box"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </div>
              <label>PASSWORD</label>
              <input
                className="input-box"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </div>
            <button
              type="submit"
              className="bottom-button"
              disabled={isSubmitting}
              onClick={e => {
                handleSubmit(e);
              }}
            >
              Sign in
            </button>
            <a className="already-member">Not a member?</a>
          </form>
        )}
      </Formik>
    );
  }
}

export class NotVerified extends Component {
  state = {
    loggedin: hasSignIn(),
    verified: isVerified()
  };
  render() {
    const { loggedin, verified } = this.state;
    return !loggedin ? (
      <Redirect to="/login"></Redirect>
    ) : (
      <div>
        You are not verified.
        <Link
          to="#"
          onClick={e => {
            sendVerificationLink();
          }}
        >
          Send Verification
        </Link>
      </div>
    );
  }
}

export default class Login extends Component {
  state = {
    signup: false,
    authenticated: hasSignIn(),
    verified: isVerified()
  };
  render() {
    const { signup, authenticated, verified } = this.state;
    if (authenticated && verified) {
      return <Redirect to="/dash" />;
    } else if (authenticated && !verified) {
      return <Redirect to="/verify" />;
    } else {
      return (
        <div>
          <main style={{ marginTop: "100px" }}>
            <section className="left">
              <h2 className="subheading">Student Grievence Cell</h2>
              <img className="rocket" src="student.png" />
              <h2 className="subheading">We are here to help!</h2>
            </section>
            <section className="right">
              <section className="form">
                <div className="top-signup">
                  <button
                    className={!signup ? "signup" : "signin"}
                    onClick={() => {
                      this.setState({ signup: false });
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className={signup ? "signup" : "signin"}
                    onClick={() => {
                      this.setState({ signup: !false });
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                <nav>
                  <a
                    className={!signup ? "term-service" : ""}
                    onClick={() => {
                      this.setState({ signup: false });
                    }}
                  >
                    Sign In
                  </a>{" "}
                  <span>or</span>{" "}
                  <a
                    className={signup ? "term-service" : ""}
                    onClick={() => {
                      this.setState({ signup: !false });
                    }}
                  >
                    Sign Up
                  </a>
                </nav>
                {authenticated && !verified ? (
                  <Redirect to="/verification" />
                ) : signup ? (
                  <Signup
                    onSubmit={() => {
                      this.setState({
                        authenticated: hasSignIn(),
                        verified: isVerified()
                      });
                    }}
                  />
                ) : (
                  <Signin
                    onSubmit={() => {
                      this.setState({
                        authenticated: hasSignIn(),
                        verified: isVerified()
                      });
                    }}
                  />
                )}
              </section>
            </section>
          </main>
        </div>
      );
    }
  }
}
