db.collection("posts").onSnapshot(s=>{
 reels.innerHTML="";
 s.forEach(v=>{
  reels.innerHTML += `
   <video src="${v.data().image}" autoplay muted loop></video>
  `;
 });
});



