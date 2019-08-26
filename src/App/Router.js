import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { SIGN_IN, FORM } from '../constants/routes';
import SignIn from '../components/SignIn';
import Form from '../components/Teacher/Form';

const Router = () => {
  return (<BrowserRouter>
    <Route path={SIGN_IN} component={SignIn} />
    <Route path={FORM} component={Form} />
  </BrowserRouter>)
}

export default Router;
