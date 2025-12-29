import { auth, db } from "./firebase.js";
import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// BUTTON EVENTLERİ
document.getElementById("registerBtn").addEventListener("click", register);
document.getElementById("loginBtn").addEventListener("click", login);

// KAYIT
async function register() {
  if (!username.value) {
    alert("Kullanıcı adı gir");
    return;
  }

  const cred = await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );

  await setDoc(doc(db, "users", cred.user.uid), {
    username: username.value,
    email: email.value,
    createdAt: Date.now()
  });
}

// GİRİŞ
async function login() {
  await signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );
}

// ÇIKIŞ
window.logout = () => signOut(auth);

// OTURUM KONTROL
onAuthStateChanged(auth, user => {
  if (user) {
    authBox.style.display = "none";
    app.style.display = "block";
  } else {
    authBox.style.display = "block";
    app.style.display = "none";
  }
});

