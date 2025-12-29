import { db, auth } from "./firebase.js";
import {
  collection,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onSnapshot(
  query(
    collection(db, "notifications"),
    where("to", "==", auth.currentUser.uid),
    where("seen", "==", false)
  ),
  snap => {
    document.title = `(${snap.size}) Pipstagram`;
  }
);
