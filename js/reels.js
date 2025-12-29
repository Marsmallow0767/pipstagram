db.collection("reels")
.orderBy("createdAt","desc")
.onSnapshot(s=>{
 reels.innerHTML="";
 s.forEach(r=>{
  reels.innerHTML+=`
   <video src="${r.data().video}" autoplay loop controls></video>
  `;
 });
});



