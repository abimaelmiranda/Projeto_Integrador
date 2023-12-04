var header = document.getElementById('cabecalho');
var content = document.getElementById('main');
var showMenu = false;

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
