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

const reelsContainer = document.getElementById("reels");
let activeReelId = null;

/* =========================
   🔥 KEŞFET ALGORİTMASI
   Like + yorum fazla olan üstte
========================= */
const exploreQuery = query(
  collection(db, "reels"),
  orderBy("likeCount", "desc")
);

/* =========================
   🎬 REELS YÜKLE
========================= */
onSnapshot(exploreQuery, snap => {
  reelsContainer.innerHTML = "";

  snap.forEach(docSnap => {
    const reel = docSnap.data();
    const reelId = docSnap.id;

    const reelDiv = document.createElement("div");
    reelDiv.className = "reel";

    reelDiv.innerHTML = `
      <video src="${reel.videoURL}" loop muted autoplay></video>

      <div class="actions">
        <button onclick="toggleLike('${reelId}')">❤️ ${reel.likeCount || 0}</button>
        <button onclick="openComments('${reelId}')">💬</button>
      </div>
    `;

    reelsContainer.appendChild(reelDiv);
  });
});

/* =========================
   ❤️ LIKE SİSTEMİ
========================= */
window.toggleLike = async (reelId) => {
  const uid = auth.currentUser.uid;
  const likeRef = doc(db, "reels", reelId, "likes", uid);
  const reelRef = doc(db, "reels", reelId);

  const liked = await getDoc(likeRef);

  if (liked.exists()) {
    await deleteDoc(likeRef);
    await updateDoc(reelRef, {
      likeCount: increment(-1)
    });
  } else {
    await setDoc(likeRef, { uid });
    await updateDoc(reelRef, {
      likeCount: increment(1)
    });
  }
};

/* =========================
   💬 YORUM POPUP
========================= */
window.openComments = (reelId) => {
  activeReelId = reelId;
  document.getElementById("commentModal").style.display = "block";

  const commentsDiv = document.getElementById("comments");
  commentsDiv.innerHTML = "";

  onSnapshot(
    collection(db, "reels", reelId, "comments"),
    snap => {
      commentsDiv.innerHTML = "";
      snap.forEach(c => {
        commentsDiv.innerHTML += `<p>${c.data().text}</p>`;
      });
    }
  );
};

window.sendComment = async () => {
  const input = document.getElementById("commentInput");
  if (!input.value) return;

  await addDoc(collection(db, "reels", activeReelId, "comments"), {
    text: input.value,
    user: auth.currentUser.uid,
    time: Date.now()
  });

  input.value = "";
};

