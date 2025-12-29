import { auth, db } from "./app.js";
import {
  doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const profile = document.getElementById("profile");

auth.onAuthStateChanged(async user => {
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};

  profile.innerHTML = `
    <img src="${data.photoURL || 'https://via.placeholder.com/100'}" width="100"><br>
    <input id="username" value="${data.username || ''}" placeholder="Kullanıcı adı"><br>
    <input id="photoURL" placeholder="Foto URL"><br>
    <button onclick="saveProfile()">Kaydet</button>
  `;
});

window.saveProfile = async () => {
  const user = auth.currentUser;

  await setDoc(doc(db, "users", user.uid), {
    username: username.value,
    photoURL: photoURL.value
  }, { merge: true });

  alert("Profil güncellendi");
};
