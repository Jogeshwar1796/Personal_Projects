
import firebase from "firebase/compat/app"
import "firebase/compat/database"
const firebaseConfig = {
  apiKey: "AIzaSyAPdm9vhsiJ9lAEUcZyeOeOuMtLk-3Um78",
  authDomain: "contact-list-82068.firebaseapp.com",
  projectId: "contact-list-82068",
  storageBucket: "contact-list-82068.appspot.com",
  messagingSenderId: "967018432330",
  appId: "1:967018432330:web:cec0d5f42315446d9223b3"
};

// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref()