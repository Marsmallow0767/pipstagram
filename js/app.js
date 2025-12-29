import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Giriş başarılı 🎉");
    })
    .catch(err => alert(err.message));
};

window.register = function () {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Kayıt başarılı 🎉");
    })
    .catch(err => alert(err.message));
};

window.showRegister = function () {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
};

window.showLogin = function () {
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
};








