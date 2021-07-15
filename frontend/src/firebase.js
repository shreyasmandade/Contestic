import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyCMyg3CWs-kecgVEceJEIDTxDtactDdqws",
  authDomain: "auslander-8242f.firebaseapp.com",
  databaseURL: "https://auslander-8242f.firebaseio.com",
  projectId: "auslander-8242f",
  storageBucket: "auslander-8242f.appspot.com",
  messagingSenderId: "18163433586",
  appId: "1:18163433586:web:f10334abcbadc47b45c2eb",
  measurementId: "G-RQ8B67VDJC"
}).auth()
