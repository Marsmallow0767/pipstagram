// Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase config (SENİN PROJE)
const firebaseConfig = {
  apiKey: "AIzaSyCWmJVnZ4LIB07cPM8t_Run-1indRrDm9s",
  authDomain: "pipstagram-5b98e.firebaseapp.com",
  projectId: "pipstagram-5b98e",
  storageBucket: "pipstagram-5b98e.firebasestorage.app",
  messagingSenderId: "894857861700",
  appId: "1:894857861700:web:1d0c9028ed4125ecf43a11"
};

// Init
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔐 Login kontrolü
onAuthStateChanged(auth, user => {
  if (!user) {
    console.log("Kullanıcı giriş yapmadı");
  } else {
    console.log("Giriş yapıldı:", user.uid);
  }
});

// 🔔 Bildirim fonksiyonu
export async function sendNotification(toUid, text) {
  await addDoc(collection(db, "notifications", toUid, "items"), {
    text,
    time: Date.now()
  });
}


