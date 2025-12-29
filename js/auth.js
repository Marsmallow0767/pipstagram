import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./app.js";

window.register = async ()=>{
  const e=email.value;
  const p=pass.value;
  await createUserWithEmailAndPassword(auth,e,p);
  alert("Kayıt OK");
};

window.login = async ()=>{
  const e=email.value;
  const p=pass.value;
  const user = await signInWithEmailAndPassword(auth,e,p);
  localStorage.setItem("uid",user.user.uid);
  location.href="index.html";
};
