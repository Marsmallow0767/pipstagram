import { auth, db } from "./app.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const profile = document.getElementById("profile");

auth.onAuthStateChanged(async user => {
  if (!user) {
    profile.innerHTML = "<p>Giriş yapılmadı</p>";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  const data = snap.exists() ? snap.data() : {};

  profile.innerHTML = `
    <img src="${data.photoURL || 'https://via.placeholder.com/90'}">
    <h3>${data.username || "Kullanıcı"}</h3>
  `;
});

