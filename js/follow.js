import { db, auth } from "./firebase.js";
import {
  setDoc, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.followUser = async (targetUid) => {
  await setDoc(doc(db,"follows",auth.currentUser.uid+"_"+targetUid),{
    from: auth.currentUser.uid,
    to: targetUid
  });
};

window.unfollowUser = async (targetUid) => {
  await deleteDoc(doc(db,"follows",auth.currentUser.uid+"_"+targetUid));
};
