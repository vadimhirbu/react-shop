import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAHMAD5WLHvxfguu-6miqatoQeL4FQtY8Q",
  authDomain: "react-shop-db-c843d.firebaseapp.com",
  databaseURL: "https://react-shop-db-c843d.firebaseio.com",
  projectId: "react-shop-db-c843d",
  storageBucket: "react-shop-db-c843d.appspot.com",
  messagingSenderId: "424600235603",
  appId: "1:424600235603:web:c5f01194b242bdb46220a6",
  measurementId: "G-N6ECDD22QZ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;