function addPost(){
 const url=prompt("Resim URL");
 db.collection("posts").add({
  userId:auth.currentUser.uid,
  image:url,
  createdAt:firebase.firestore.FieldValue.serverTimestamp()
 })
}

db.collection("posts")
.orderBy("createdAt","desc")
.onSnapshot(snap=>{
 feed.innerHTML=""
 snap.forEach(d=>{
  feed.innerHTML+=`<div class="post"><img src="${d.data().image}"></div>`
 })
})












