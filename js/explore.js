import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.loadExplore = async () => {
  feed.innerHTML = "";

  const q = query(
    collection(db, "posts"),
    orderBy("likes", "desc")
  );

  const snap = await getDocs(q);

  snap.forEach(d => {
    const p = d.data();
    if (p.user !== auth.currentUser.uid) {
      feed.innerHTML += `
        <div class="post">
          <img src="${p.imageUrl}">
          <p>❤️ ${p.likes}</p>
        </div>
      `;
    }
  });
};
