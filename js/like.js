import { db, auth } from "./firebase.js";
import {
  doc, setDoc, deleteDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.toggleLike = async (postId) => {
  const ref = doc(db, "likes", postId + "_" + auth.currentUser.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    await deleteDoc(ref);
  } else {
    await setDoc(ref, {
      postId,
      uid: auth.currentUser.uid,
      time: Date.now()
    });
  }
};
