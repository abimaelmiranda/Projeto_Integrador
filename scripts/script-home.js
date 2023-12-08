var header = document.getElementById('header-anchor');
var showMenu = false;
window.onscroll = function() {fixarHeader()};

function toggleMenu(){
    let navegationHeader = document.getElementById('header-nav-menu');
    let content = document.getElementById('main');
    showMenu = !showMenu;
    if(showMenu){
        navegationHeader.style.marginLeft = "0vw"
        navegationHeader.style.animationName = 'showMenu'
        content.style.filter = `blur(2px)`
        content.style.backdropFilter = `blur(2px)`  
    }else{
        navegationHeader.style.marginLeft = "-100vw"
        navegationHeader.style.animationName = 'hideMenu'
        content.style.filter = ``
        content.style.backdropFilter = ``
    }
}

function closeMenu(){
    if (showMenu) {
        toggleMenu()
    }
}

function fixarHeader() {
  let sticky = header.offsetTop;
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function anchor() {
  window.scrollTo(0, 0)
}

