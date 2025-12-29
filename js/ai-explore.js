import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function loadAIExplore() {
  feed.innerHTML = "";

  const interactions = await getDocs(
    query(
      collection(db, "interactions"),
      where("user", "==", auth.currentUser.uid)
    )
  );

  const likedPosts = new Set();
  interactions.forEach(d => likedPosts.add(d.data().postId));

  const posts = await getDocs(
    query(
      collection(db, "posts"),
      orderBy("likes", "desc")
    )
  );

  posts.forEach(d => {
    if (!likedPosts.has(d.id)) {
      const p = d.data();
      feed.innerHTML += `
        <div class="post">
          <img src="${p.imageUrl}">
          <p>❤️ ${p.likes}</p>
        </div>
      `;
    }
  });
}
