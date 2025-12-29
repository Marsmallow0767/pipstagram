import { getAuth } from "firebase/auth";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "./app.js";

const auth = getAuth();

function chatId(uid1, uid2) {
  return [uid1, uid2].sort().join("_");
}

window.sendDM = async (toUid, text) => {
  const cid = chatId(auth.currentUser.uid, toUid);

  await addDoc(collection(db, "chats", cid, "messages"), {
    text,
    sender: auth.currentUser.uid,
    time: Date.now()
  });
};

window.loadDM = (toUid) => {
  const cid = chatId(auth.currentUser.uid, toUid);

  onSnapshot(collection(db, "chats", cid, "messages"), snap => {
    messages.innerHTML = "";
    snap.forEach(d => {
      messages.innerHTML += `<div>${d.data().text}</div>`;
    });
  });
};

