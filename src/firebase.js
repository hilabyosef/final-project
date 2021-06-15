import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA224qbBdPou_Bp0cNfFVgZWkSLsj5aEO0",
    authDomain: "final-project-5b8c1.firebaseapp.com",
    databaseURL: "https://final-project-5b8c1-default-rtdb.firebaseio.com",
    projectId: "final-project-5b8c1",
    storageBucket: "final-project-5b8c1.appspot.com",
    messagingSenderId: "618278814213",
    appId: "1:618278814213:web:8b471743e6cf77ae8ed26c"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectStorage, timestamp, fire }



