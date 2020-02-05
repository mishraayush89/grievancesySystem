import React, { Component } from "react";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { hasSignIn, isVerified } from "./components/firebase/FirebaseUitls";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
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
            <PrivateRoute path="/" />
            <PrivateRoute path="/admin" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const PrivateRoute = () => (hasSignIn() && isVerified()) ? <></> : <Redirect to="/login" />;

