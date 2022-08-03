import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDAMczqCBfVsNgmz8TPnqao4SxXw5jwL8s",
    authDomain: "movie-library-ce14c.firebaseapp.com",
    projectId: "movie-library-ce14c",
    storageBucket: "movie-library-ce14c.appspot.com",
    messagingSenderId: "526368892840",
    appId: "1:526368892840:web:9e586cbc02b739baf75f9d"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)