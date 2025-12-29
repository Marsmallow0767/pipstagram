window.startLive = async () => {
  const s = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
  document.querySelector("video").srcObject = s;
};
