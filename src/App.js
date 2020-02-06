import React, { Component } from "react";
import Login from "./components/Login";
import Form from './components/Form'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { hasSignIn, isVerified } from "./firebase/FirebaseUitls";
import Dashboard from "./components/Dashboard";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/form">Form</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/admin">
              <div />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/form">
              <Form />
            </Route>
            <Route path="/dash">
              <Dashboard />
            </Route>
            <PrivateRoute path="/" />
            <PrivateRoute path="/admin" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const PrivateRoute = () =>
  (hasSignIn() && isVerified()) ? <Form /> : <Redirect to="/login" />;
