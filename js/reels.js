import { db, auth } from "./firebase.js";
import {
  collection,
  onSnapshot,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import { storage } from "./firebase.js";

// 🎬 REELS YÜKLEME
window.uploadReel = async () => {
  const file = document.getElementById("reelFile").files[0];
  if (!file) return alert("Video seç");

  const videoRef = ref(storage, "reels/" + Date.now() + file.name);
  await uploadBytes(videoRef, file);
  const url = await getDownloadURL(videoRef);

  await addDoc(collection(db, "reels"), {
    video: url,
    uid: auth.currentUser.uid,
    time: Date.now()
  });

  alert("Reels yüklendi 🎉");
};

// 🎬 REELS GÖSTER
onSnapshot(collection(db, "reels"), snap => {
  const reelsDiv = document.getElementById("reels");
  reelsDiv.innerHTML = "";

  snap.forEach(doc => {
    reelsDiv.innerHTML += `
      <div style="margin-bottom:20px">
        <video src="${doc.data().video}" controls style="width:100%"></video>
        <button onclick="toggleLike('${doc.id}')">❤️ Like</button>
      </div>
    `;
  });
});


