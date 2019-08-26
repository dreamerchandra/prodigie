import React from 'react';
import Router from './Router';
import firebase, { FirebaseContext } from '../contextProviders/Firebase';
import FirebaseUser, { useFirebaseAuth } from '../contextProviders/FirebaseUser';

const App = () => {
  const user = useFirebaseAuth();
  return (
    <FirebaseContext.Provider value={firebase}>
      <FirebaseUser.Provider value={user}>
        <Router />
      </FirebaseUser.Provider>
    </FirebaseContext.Provider>)
}

export default App;