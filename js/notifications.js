import { db, auth } from "./firebase.js";
import { addDoc, collection } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function sendNotification(to, type, postId = null) {
  if (to === auth.currentUser.uid) return;

  await addDoc(collection(db, "notifications"), {
    to,
    from: auth.currentUser.uid,
    type,
    postId,
    seen: false,
    createdAt: Date.now()
  });
}
