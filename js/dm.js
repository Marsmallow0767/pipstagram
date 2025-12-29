import { auth, db } from "./app.js";
import {
  collection, addDoc, onSnapshot, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const box = document.getElementById("dmMessages");
const input = document.getElementById("dmInput");

window.sendDM = async () => {
  if (!input.value) return;

  await addDoc(collection(db, "globalDM"), {
    text: input.value,
    uid: auth.currentUser.uid,
    time: Date.now()
  });

  input.value = "";
};

onSnapshot(
  query(collection(db, "globalDM"), orderBy("time")),
  snap => {
    box.innerHTML = "";
    snap.forEach(m => {
      box.innerHTML += `<p>${m.data().text}</p>`;
    });
  }
);
