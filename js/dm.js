function send(){
 db.collection("messages").add({
  from: auth.currentUser.uid,
  to: chatUser,
  msg: encrypt(msgInput.value),
  time: firebase.firestore.FieldValue.serverTimestamp()
 });
}

db.collection("messages")
.where("to","==",auth.currentUser.uid)
.onSnapshot(s=>{
 chat.innerHTML="";
 s.forEach(m=>{
  chat.innerHTML+=`<p>${decrypt(m.data().msg)}</p>`;
 });
});



