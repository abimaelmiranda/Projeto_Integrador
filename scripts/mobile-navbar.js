var header = document.getElementById('cabecalho');
var navegationHeader = document.getElementById('menu-itens');
var content = document.getElementById('main');
var showSidebar = false;


function toggleSideBar(){
    showSidebar = !showSidebar;
    if(showSidebar){
        navegationHeader.style.marginLeft = "-58vw"
       
    }else{
        navegationHeader.style.marginLeft = "-200vw"
    }
    console.log(showSidebar)
}