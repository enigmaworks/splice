WebFont.load({
    google: {
      families: ["Orbitron:900", "Roboto Slab:500,700", "Darker Grotesque:600", "JetBrains Mono:500, 800"]
    },
    active: getstuff
});

function canvasSize(){
  setTimeout(canvasSize, 5);
  let wrapper = document.getElementById('gameWrapper');
  let bcr = canvas.getBoundingClientRect();
  let btn = document.getElementById('fullscreenBTN');
  if(wrapper.classList.contains("fullscreen")){
    let infoFSlist = [].slice.call(document.getElementsByClassName('infoFS'));
    let infoFS = infoFSlist[0];
    infoFS.style.top = "" + bcr.top + "px";
    infoFS.style.right = "" + window.innerWidth - bcr.right + "px";
    infoFS.style.bottom = "" + window.innerHeight - bcr.bottom + "px";
    btn.style.right =  window.innerWidth - bcr.right + 8 + "px";
    btn.style.bottom =  window.innerHeight - bcr.bottom + 8 + "px";
    if(window.innerWidth / window.innerHeight > 3/2){
      canvas.classList.add('horizontal');
      canvas.classList.remove("vertical");
    } else{
      canvas.classList.add('vertical');
      canvas.classList.remove('horizontal');
    }
  } else {
    canvas.classList.remove('horizontal', "vertical");
  }
}

function getstuff(){
  let wrapper = document.getElementById('gameWrapper');
  let info = document.getElementById("info");
  let btn = document.getElementById('fullscreenBTN');

  btn.addEventListener("click", ()=>{
    wrapper.classList.toggle('fullscreen');
    document.body.classList.toggle('hideScroll');
    btn.classList.toggle('rotate');
    info.classList.toggle('infoFS')
    setTimeout(canvasSize, 5)
    if(wrapper.classList.contains("fullscreen")){
      window.scrollTo(0,0);
      canvasSize();
    } else {
      canvas.classList.remove('horizontal', "vertical");
      info.classList.remove("infoFS");
      info.style.top = "calc(1rem + 1px)";
      info.style.bottom = "calc(1rem + 5px)";
      info.style.right = "calc(1rem + 1px)";
      btn.style.bottom = "calc(1rem + 11px)";
      btn.style.right = "calc(1rem + 8px)";
    }
  })
  window.onresize = canvasSize;
}
