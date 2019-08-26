import React from 'react';

const FirebaseUser = React.createContext(null);

export const withFirebaseAuth = Component => props => (
  <FirebaseUser.Consumer>
    {user => <Component {...props} user={user} />}
  </FirebaseUser.Consumer>
);

export default FirebaseUser;