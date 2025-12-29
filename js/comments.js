import { db, auth } from "./firebase.js";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let activePostId = null;

window.openComments = async postId => {
  activePostId = postId;
  commentModal.style.display = "block";
  loadComments();
};

window.closeComments = () => {
  commentModal.style.display = "none";
};

async function loadComments() {
  commentList.innerHTML = "";
  const q = query(
    collection(db, "comments"),
    where("postId", "==", activePostId)
  );

  const snap = await getDocs(q);
  snap.forEach(d => {
    commentList.innerHTML += `<p>${d.data().text}</p>`;
  });
}

window.sendComment = async () => {
  if (!commentInput.value) return;

  await addDoc(collection(db, "comments"), {
    postId: activePostId,
    user: auth.currentUser.uid,
    text: commentInput.value,
    createdAt: Date.now()
  });

  commentInput.value = "";
  loadComments();
};
