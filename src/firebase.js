import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCzZvCwa_QcVa_Lr2k61pPOWRuc8rb57QI",
    authDomain: "facebook-clone-eaa35.firebaseapp.com",
    databaseURL: "https://facebook-clone-eaa35.firebaseio.com",
    projectId: "facebook-clone-eaa35",
    storageBucket: "facebook-clone-eaa35.appspot.com",
    messagingSenderId: "1092137564005",
    appId: "1:1092137564005:web:fbc5bdf39446fba24d938c",
    measurementId: "G-X8VSZ718XZ"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { db, auth, storage };