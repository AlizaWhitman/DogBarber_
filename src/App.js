import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store"
import { Provider } from 'react-redux';
import Queue from './components/Queue';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import SignUp from "./components/SignUpForm";
import SignIn from "./components/SignInForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDissmiss="true">
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={SignIn}></Route>
            <Route path="/signUp" component={SignUp}></Route>
            <Route path="/queue" component={Queue}></Route>
          </Switch>
        </Container>
      </ToastProvider>
    </Provider>
  )
}

export default App;
