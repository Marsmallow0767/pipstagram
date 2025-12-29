import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWmJVnZ4LIB07cPM8t_Run-1indRrDm9s",
  authDomain: "pipstagram-5b98e.firebaseapp.com",
  projectId: "pipstagram-5b98e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

window.login = () => {
  const email = email.value;
  const password = password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("login").style.display = "none";
      document.getElementById("chat").style.display = "block";
    })
    .catch(err => alert(err.message));
};

window.sendMessage = async () => {
  await addDoc(collection(db, "messages"), {
    text: msgInput.value,
    time: Date.now()
  });
  msgInput.value = "";
};

onSnapshot(collection(db, "messages"), snap => {
  messages.innerHTML = "";
  snap.forEach(doc => {
    const div = document.createElement("div");
    div.className = "msg";
    div.innerText = doc.data().text;
    messages.appendChild(div);
  });
});
