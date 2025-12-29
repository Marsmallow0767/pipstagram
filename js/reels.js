import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  getDoc,
  updateDoc,
  query,
  orderBy,
  increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { auth, db } from "./app.js";
import { sendNotification } from "./app.js";

const reelsDiv = document.getElementById("reels");
let activeReelId = null;

/* 🔥 KEŞFET */
const exploreQuery = query(
  collection(db, "reels"),
  orderBy("likeCount", "desc")
);

/* 🎬 REELS ÇEK */
onSnapshot(exploreQuery, snap => {
  reelsDiv.innerHTML = "";

  snap.forEach(d => {
    const r = d.data();
    const reelId = d.id;

    const div = document.createElement("div");
    div.className = "reel";

    div.innerHTML = `
      <video src="${r.videoURL}" loop muted autoplay></video>

      <div class="actions">
        <button onclick="toggleLike('${reelId}', '${r.ownerUid}')">
          ❤️ ${r.likeCount || 0}
        </button>
        <button onclick="openComments('${reelId}')">💬</button>
      </div>
    `;

    reelsDiv.appendChild(div);
  });
});

/* ❤️ LIKE */
window.toggleLike = async (reelId, ownerUid) => {
  const uid = auth.currentUser.uid;
  const likeRef = doc(db, "reels", reelId, "likes", uid);
  const reelRef = doc(db, "reels", reelId);

  const liked = await getDoc(likeRef);

  if (liked.exists()) {
    await deleteDoc(likeRef);
    await updateDoc(reelRef, { likeCount: increment(-1) });
  } else {
    await setDoc(likeRef, { uid });
    await updateDoc(reelRef, { likeCount: increment(1) });

    if (uid !== ownerUid) {
      await addDoc(collection(db, "notifications", ownerUid, "items"), {
        text: "❤️ Gönderin beğenildi",
        time: Date.now()
      });
    }
  }
};

/* 💬 YORUMLAR */
window.openComments = (reelId) => {
  activeReelId = reelId;
  commentModal.style.display = "block";

  onSnapshot(collection(db, "reels", reelId, "comments"), snap => {
    comments.innerHTML = "";
    snap.forEach(c => {
      comments.innerHTML += `<p>${c.data().text}</p>`;
    });
  });
};

window.sendComment = async () => {
  if (!commentInput.value) return;

  await addDoc(collection(db, "reels", activeReelId, "comments"), {
    text: commentInput.value,
    user: auth.currentUser.uid,
    time: Date.now()
  });

  commentInput.value = "";
};
