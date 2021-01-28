import firebase from "firebase/app";
import "firebase/auth";
//import { customErrorHandler } from "../helper/customErrorHandler";
//firestore

const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const prodConfig = {};

const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;

//firebase.initializeApp(config)

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.firebaseAuth = firebase.auth();
  }

  async register(displayName, email, password) {
    try {
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
      this.firebaseAuth.currentUser.updateProfile({
        displayName,
      });
    } catch (err) {
      console.log("F. Error:", err);
    } finally {
      window.location.href = "/";
    }
  }

  async useGoogleProvider() {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.setCustomParameters({ prompt: "select_account" });
      await this.firebaseAuth.signInWithPopup(googleProvider);
    } catch (err) {
      console.log("F. Error:", err);
    } finally {
      window.location.href = "/";
    }
  }

  async signIn(displayName, email, password) {
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("F. Error:", err);
    } finally {
      window.location.href = "/";
    }
  }

  async signOut() {
    try {
      await this.firebaseAuth.signOut();;
    } catch (err) {
      console.log("F. Error:", err);
    } finally {
      window.location.href = "/login";
    }
  }

  async forgotPassword(email) {
    try {
      await this.firebaseAuth.sendPasswordResetEmail(email);
    } catch (err) {
      console.log("F. Error:", err);
    }
  }

}

export default new Firebase();
