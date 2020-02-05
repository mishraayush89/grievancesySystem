import React, { Component } from "react";
import Login, { NotVerified } from "./components/Login";
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
                <Link to="/home">Home</Link>
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
            <Route path="/verification">
              <NotVerified/>
            </Route>
            <PrivateRoute path="/" />
            <PrivateRoute path="/admin" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const PrivateRoute = () => (hasSignIn() && isVerified()) ? <Redirect to="/home"/> : <Redirect to="/login" />;

