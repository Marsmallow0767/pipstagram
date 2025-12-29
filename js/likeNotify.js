import { db } from "./app.js";
import { addDoc, collection } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function likeNotify(postOwnerUid) {
  await addDoc(collection(db, "notifications", postOwnerUid, "items"), {
    text: "❤️ Gönderin beğenildi",
    time: Date.now()
  });
}
