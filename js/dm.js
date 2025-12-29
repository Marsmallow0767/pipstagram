import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let chatId;

window.openChat = uid => {
  chat.style.display = "block";
  chatId = [auth.currentUser.uid, uid].sort().join("_");

  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt")
  );

  onSnapshot(q, snap => {
    messages.innerHTML = "";
    snap.forEach(d => {
      messages.innerHTML += `<p>${d.data().text}</p>`;
    });
  });
};

window.sendMessage = async () => {
  if (!msgInput.value) return;

  await addDoc(
    collection(db, "chats", chatId, "messages"),
    {
      from: auth.currentUser.uid,
      text: msgInput.value,
      createdAt: Date.now()
    }
  );

  msgInput.value = "";
};

