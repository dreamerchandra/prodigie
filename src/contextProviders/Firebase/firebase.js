import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
    this.userDetails = null;
  }
  doSignOut = () => this.auth.signOut();
  doGoogleLogin = async (successCallBack, failureCallBack) => {
    try {
      const { user } = await this.auth.signInWithPopup(this.provider);
      console.log(user);
      const authUser = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        providerData: user.providerData,
      };
      successCallBack && successCallBack(authUser);
    } catch (err) {
      console.error(err.message);
      failureCallBack && failureCallBack();
    }
  }
  onAuthStateChanged(successCallBack, failureCallBack) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        const authUser = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          providerData: user.providerData,
          photoURL: user.photoURL
        };
        successCallBack(authUser);
      } else {
        this.userDetails = null;
        failureCallBack();
      }
    })
  }
}

export default new Firebase();