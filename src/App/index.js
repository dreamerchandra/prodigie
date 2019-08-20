import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SIGN_IN } from '../constants/routes';
import SignIn from '../components/SignIn';
import React from 'react';

const App = () => {
  return(<Router>
    <Route path={SIGN_IN} component={SignIn}/>
  </Router>)
}

export default App;