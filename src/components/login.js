import React, { Component, useState } from "react";
import { Formik } from "formik";
import {
  signIn,
  hasSignIn,
  isVerified,
  sendVerificationLink,
  signUp
} from "./firebase/FirebaseUitls";
import "../App.css";

function Signup() {
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
        const error = {}
        setSubmitting(true);
        if (!hasSignIn()) {
          console.log(values.email, values.password);
          await signUp(values.email, values.password)
            .catch(function(err) {
              var errorCode = err.code;
              var errorMessage = err.message;
              
            })
            .then(() => {
              if (!isVerified()) {
                sendVerificationLink();
                setSubmitting(false);
              }
            });
        }
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

function Signin() {
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
          >
            Sign in
          </button>
          <a className="already-member">Not a member?</a>
        </form>
      )}
    </Formik>
  );
}


function Login() {
  const [signup, isSignup] = useState(false);
  const handleChange = state => isSignup(state);
  return (
    <div>
      <main style={{ marginTop: "100px" }}>
        <section className="left">
          <div className="logo">
            <img
              className="beer"
              src="https://image.iccpic.com/previews/d2/8b/5d/45ea07370ad9ce0f.svg"
            />
          </div>
          <h2 className="subheading">Student Grievence Cell</h2>
          <img className="rocket" src="student.png" />
          <h2 className="subheading">We are here to help!</h2>
        </section>
        <section className="right">
          <section className="form">
            <div className="top-signup">
              <button
                className={signup ? "signup" : "signin"}
                onClick={() => {
                  handleChange(false);
                }}
              >
                Sign In
              </button>
              <button
                className={!signup ? "signup" : "signin"}
                onClick={() => {
                  handleChange(!false);
                }}
              >
                Sign Up
              </button>
            </div>
            <nav>
              <a
                className={!signup ? "term-service" : ""}
                onClick={() => {
                  handleChange(false);
                }}
              >
                Sign In
              </a>{" "}
              <span>or</span>{" "}
              <a
                className={signup ? "term-service" : ""}
                onClick={() => {
                  handleChange(!false);
                }}
              >
                Sign Up
              </a>
            </nav>
            {signup ? <Signup /> : <Signin />}
          </section>
        </section>
      </main>
    </div>
  );
}

export default Login;
