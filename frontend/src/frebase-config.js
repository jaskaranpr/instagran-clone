import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNUnK3rpMQV0IufJ1vi3aCIQrs3InKO5w",
  authDomain: "instagram-6f62e.firebaseapp.com",
  projectId: "instagram-6f62e",
  storageBucket: "instagram-6f62e.appspot.com",
  messagingSenderId: "847612019323",
  appId: "1:847612019323:web:a213c9066ca680a684d8de",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
