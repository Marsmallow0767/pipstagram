import { auth, db } from "./app.js";
import {
  collection, addDoc, onSnapshot, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const box = document.getElementById("dmMessages");

function chatId(uid1, uid2) {
  return [uid1, uid2].sort().join("_");
}

window.sendDM = async () => {
  const to = dmTarget.value;
  const text = dmInput.value;
  if (!to || !text) return;

  const cid = chatId(auth.currentUser.uid, to);

  await addDoc(collection(db, "chats", cid, "messages"), {
    text,
    sender: auth.currentUser.uid,
    time: Date.now()
  });

  dmInput.value = "";
};

window.loadDM = () => {
  const to = dmTarget.value;
  if (!to) return;

  const cid = chatId(auth.currentUser.uid, to);

  onSnapshot(
    query(collection(db, "chats", cid, "messages"), orderBy("time")),
    snap => {
      box.innerHTML = "";
      snap.forEach(m => {
        box.innerHTML += `<p>${m.data().text}</p>`;
      });
    }
  );
};

dmTarget.addEventListener("change", loadDM);
