import { auth } from "./app.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.register = async () => {
  const email = emailInput.value;
  const pass = passwordInput.value;

  await createUserWithEmailAndPassword(auth, email, pass);
  alert("Kayıt başarılı");
};

window.login = async () => {
  const email = emailInput.value;
  const pass = passwordInput.value;

  await signInWithEmailAndPassword(auth, email, pass);
  alert("Giriş başarılı");
};
