import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = () => {
  const e = email.value;
  const p = password.value;
  signInWithEmailAndPassword(auth, e, p);
};

window.register = () => {
  const e = email.value;
  const p = password.value;
  createUserWithEmailAndPassword(auth, e, p);
};

window.logout = () => signOut(auth);

onAuthStateChanged(auth, user => {
  if (user) {
    loginPage.style.display = "none";
    app.style.display = "block";
  }
});

