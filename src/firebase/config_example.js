//Remove the _example part in the file and add your information 

import firebase from 'firebase/app'

//import the services we want

import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "your-ApiKey",
    authDomain: "your-authDomain",
    projectId: "your-projectId",
    storageBucket: "your-storageBucket",
    messagingSenderId: "your-messagingSenderId",
    appId: "your-appId"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  // init services (init each services)
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  // timestamp
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore, projectAuth, timestamp}

