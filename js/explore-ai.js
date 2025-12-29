const feed = document.getElementById("feed");

const posts = [
  {id:1,img:"https://picsum.photos/500/600",score:0},
  {id:2,img:"https://picsum.photos/500/601",score:0},
  {id:3,img:"https://picsum.photos/500/602",score:0}
];

function render(list){
  feed.innerHTML="";
  list.forEach(p=>{
    feed.innerHTML+=`
    <div class="post">
      <img src="${p.img}">
      <div>
        <span onclick="like(${p.id})">❤️</span>
        <span>💬</span>
      </div>
    </div>`;
  });
}

window.like = id=>{
  const p = posts.find(x=>x.id===id);
  p.score+=10;
  loadExplore();
};

window.loadExplore = ()=>{
  const sorted = [...posts].sort((a,b)=>b.score-a.score);
  render(sorted);
};

window.loadFeed = ()=>render(posts);

loadFeed();
