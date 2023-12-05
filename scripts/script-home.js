var header = document.getElementById('header-anchor');
var content = document.getElementById('main');
var showMenu = false;
var sticky = header.offsetTop;
window.onscroll = function() {fixarHeader()};

function toggleMenu(){
    var navegationHeader = document.getElementById('header-nav-menu');
    showMenu = !showMenu;
    if(showMenu){
        navegationHeader.style.marginLeft = "0vw"
        navegationHeader.style.animationName = 'showMenu'
        content.style.filter = `blur(2px)`
    }else{
        navegationHeader.style.marginLeft = "-100vw"
        navegationHeader.style.animationName = 'hideMenu'
        content.style.filter = ``
    }
}

function closeMenu(){
    if (showMenu) {
        toggleMenu()
    }
}

function fixarHeader() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function scrollTop() {
  window.scrollTo(0,0)
}