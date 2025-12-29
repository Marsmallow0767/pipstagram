import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWmJVnZ4LIB07cPM8t_Run-1indRrDm9s",
  authDomain: "pipstagram-5b98e.firebaseapp.com",
  projectId: "pipstagram-5b98e",
  storageBucket: "pipstagram-5b98e.firebasestorage.app",
  messagingSenderId: "894857861700",
  appId: "1:894857861700:web:1d0c9028ed4125ecf43a11"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
