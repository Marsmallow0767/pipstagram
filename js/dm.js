function send(){
 db.collection("messages").add({
  from:auth.currentUser.uid,
  text:msg.value,
  time:firebase.firestore.FieldValue.serverTimestamp()
 })
}

db.collection("messages")
.orderBy("time")
.onSnapshot(s=>{
 chat.innerHTML=""
 s.forEach(m=>{
  chat.innerHTML+=`<p>${m.data().text}</p>`
 })
})


