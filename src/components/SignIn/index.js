import React, { Component } from 'react';
import { FirebaseContext, withFirebase } from '../../sharedComponent/Firebase';
import { Link, withRouter } from 'react-router-dom';

const signUp = () => {
  return (<div>
    <h1>SignUp</h1>
    <FirebaseContext.Consumer>
      {firebase => <GoogleSignIn firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>)
}

function GoogleSignInBase({ firebase }) {
  return <button onClick={firebase.doGoogleLogin}>SignUp</button>
}

const GoogleSignIn = withRouter(withFirebase(GoogleSignInBase));


export default signUp;