import firebase from "firebase/app"
import 'firebase/firestore'

if (!firebase.apps.length) {
 firebase.initializeApp({
  apiKey: "AIzaSyBFL_zIPRn1SCErWAsAvW7zk2-x3EOlNA0",
  authDomain: "share-hondana.firebaseapp.com",
  projectId: "share-hondana",
  storageBucket: "share-hondana.appspot.com",
  messagingSenderId: "652171419991",
  appId: "1:652171419991:web:817a3f9b7cdcef0ab09e12",
  measurementId: "G-VYM2H115C4"
 })
}

export default firebase