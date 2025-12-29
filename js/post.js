import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./app.js";

const feed = document.getElementById("feed");

export async function loadPosts(){
  const snap = await getDocs(collection(db,"posts"));
  feed.innerHTML = "";
  snap.forEach(doc=>{
    const p = doc.data();
    feed.innerHTML += `
      <div class="post">
        <img src="${p.image}">
        <div class="actions">
          <span>❤️ ${p.likes || 0}</span>
        </div>
      </div>
    `;
  });
}
