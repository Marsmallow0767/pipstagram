import { auth, db } from "./app.js";
import { doc, setDoc, deleteDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.followUser = async (targetUid) => {
  await setDoc(doc(db, "follows", auth.currentUser.uid, "following", targetUid), {
    time: Date.now()
  });
};

window.unfollowUser = async (targetUid) => {
  await deleteDoc(doc(db, "follows", auth.currentUser.uid, "following", targetUid));
};
