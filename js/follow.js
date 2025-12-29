import { auth, db } from "./app.js";
import {
  doc, setDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.followUser = async () => {
  const target = targetUid.value;
  if (!target) return;

  await setDoc(doc(db, "follows", auth.currentUser.uid, "following", target), {
    time: Date.now()
  });

  alert("Takip edildi");
};

window.unfollowUser = async () => {
  const target = targetUid.value;
  if (!target) return;

  await deleteDoc(doc(db, "follows", auth.currentUser.uid, "following", target));
  alert("Takip bırakıldı");
};
