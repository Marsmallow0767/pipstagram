import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.searchUser = async () => {
  const qText = document.getElementById("searchInput").value;
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  const q = query(
    collection(db, "users"),
    where("username", ">=", qText),
    where("username", "<=", qText + "\uf8ff")
  );

  const snap = await getDocs(q);

  snap.forEach(doc => {
    const u = doc.data();
    resultDiv.innerHTML += `
      <div style="padding:10px;border-bottom:1px solid #ddd;cursor:pointer"
           onclick="openProfile('${doc.id}')">
        <img src="${u.avatar || ''}" width="40" style="border-radius:50%">
        <b>${u.username}</b>
      </div>
    `;
  });
};
