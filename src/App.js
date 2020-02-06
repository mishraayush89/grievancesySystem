import React, { Component } from "react";
import Login from "./components/Login";
import Form from "./components/Form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { hasSignIn, isVerified } from "./firebase/FirebaseUitls";
import Dashboard from "./components/Dashboard";
import {NotVerified} from './components/Login'

export default class App extends Component {
  render() {
    return (
      <div class="container">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dash"></Redirect>
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/verify">
              <NotVerified />
            </Route>
            <PrivateRoute exact path="/form" component={Form} />
            <PrivateRoute path="/dash" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      hasSignIn() && isVerified() ? <Component /> : <Redirect to="/login" />
    }
  />
);
