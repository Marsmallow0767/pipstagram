import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let index = 0;

window.showReels = async () => {
  feed.style.display = "none";
  profile.style.display = "none";
  reels.style.display = "block";
  reels.innerHTML = "";

  const snap = await getDocs(collection(db, "reels"));

  snap.forEach(d => {
    reels.innerHTML += `
      <video src="${d.data().videoUrl}"
        class="reel"
        muted
        loop></video>
    `;
  });

  document.querySelectorAll(".reel")[0]?.play();
};

reels.addEventListener("wheel", e => {
  const vids = document.querySelectorAll(".reel");
  vids[index]?.pause();
  index += e.deltaY > 0 ? 1 : -1;
  index = Math.max(0, Math.min(index, vids.length - 1));
  vids[index]?.play();
});

