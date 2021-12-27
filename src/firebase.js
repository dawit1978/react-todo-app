// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// import firebase from "firebase"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
// import "firebase/compat/auth"

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyBrHdRwp9No_samJcJ9QhXj4OEaateLkHQ",
    authDomain: "dev-chat-app-5ad74.firebaseapp.com",
    projectId: "dev-chat-app-5ad74",
    storageBucket: "dev-chat-app-5ad74.appspot.com",
    messagingSenderId: "420777506246",
    appId: "1:420777506246:web:fe6fd6214ee0fe3bce2ec7",
    measurementId: "G-FZ8H916J2T"

});
const db = firebaseApp.firestore();
// const auth = firebase.auth();

export default db ;