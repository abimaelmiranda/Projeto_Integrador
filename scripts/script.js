function sizeChange(){
    var itens = document.getElementById("menu-itens");
    if(window.innerWidth >= 768){
        itens.style.display = 'block';
    } else {
        itens.style.display = 'none';
    }
}

function clicMenu() {
    var itens = document.getElementById("menu-itens");
    if (itens.style.display == 'block') {
        itens.style.display = "none";
    } else {
        itens.style.display = 'block';
    }
}