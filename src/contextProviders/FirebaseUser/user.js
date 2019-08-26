import React from 'react';
import firebase from '../Firebase';

function useFirebaseAuth() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    firebase.onAuthStateChanged((user) => {
      console.log('useFirebaseAuth::: sign in success', user);
      setUser(user);
    }, (err) => {
      console.error('useFirebaseAuth::: sign in failed with error', err);
      setUser(null);
    });
  }, [])
  return user;
}

export default useFirebaseAuth;