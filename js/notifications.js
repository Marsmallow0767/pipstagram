import { auth, db } from "./app.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const notif = document.getElementById("notifications");

auth.onAuthStateChanged(user => {
  if (!user) return;

  onSnapshot(collection(db, "notifications", user.uid, "items"), snap => {
    notif.innerHTML = "<h3>Bildirimler</h3>";
    snap.forEach(n => {
      notif.innerHTML += `<p>🔔 ${n.data().text}</p>`;
    });
  });
});
