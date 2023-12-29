import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

let _firebase = null;
let _auth = null;
try {
  firebase.initializeApp({
    apiKey: process.env?.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env?.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env?.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env?.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env?.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env?.REACT_APP_FIREBASE_APP_ID,
  });
  _firebase = firebase?.firestore() || null;
  _auth = firebase?.auth() || null;
} catch (error) {}

export const firestoreFirebaseApp = _firebase;
export const firestoreFirebaseAuthApp = _auth;
