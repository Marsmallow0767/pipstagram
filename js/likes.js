import { doc, updateDoc, increment } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./app.js";

window.likePost = async (postId, ownerUid)=>{
  await updateDoc(doc(db,"posts",postId),{
    likes: increment(1)
  });

  await addNotification(ownerUid,"❤️ Gönderin beğenildi");
};
