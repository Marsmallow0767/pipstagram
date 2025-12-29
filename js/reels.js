import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./app.js";

const reelsContainer = document.getElementById("reels");

if (!reelsContainer) {
  console.error("reels div bulunamadı");
}

// 🔥 Reels çek
onSnapshot(collection(db, "reels"), snapshot => {
  reelsContainer.innerHTML = "";

  snapshot.forEach(doc => {
    const reel = doc.data();

    const video = document.createElement("video");
    video.src = reel.videoURL;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;

    video.style.height = "100vh";
    video.style.width = "100%";
    video.style.objectFit = "cover";

    reelsContainer.appendChild(video);
  });
});

// 📱 Swipe autoplay (TikTok hissi)
document.addEventListener("scroll", () => {
  document.querySelectorAll("video").forEach(v => {
    const rect = v.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      v.play();
    } else {
      v.pause();
    }
  });
});

