window.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header-anchor");
  const footer = document.querySelector(".footer");
  const anchor = document.querySelector("#anchor-top");
  const btnMenu = document.querySelector("#btn-nav-menu");
  const btnMenuClose = document.querySelector(".btn-menu-close");
  const mainContainer = document.querySelector("main");
  let showMenu = false;

  if (anchor) {
    anchor.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  }

  if (btnMenu) {
    btnMenu.addEventListener("click", toggleMenu);
  }

  if (btnMenuClose) {
    btnMenuClose.addEventListener("click", toggleMenu);
  }
  if (mainContainer) {
    mainContainer.addEventListener("click", closeMenu);
  }

  window.addEventListener("scroll", () => {
    fixarFooter();
    fixarHeader();
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("saveRecipeButton")) {
      const checkbox = event.target;
      const icon = checkbox.parentElement.querySelector(".saveRecipeIcon");
      toggleSave(checkbox, icon);
    }
  });
  
  function toggleMenu() {
    const navegationHeader = document.getElementById("header-nav-menu");
    const acnhor = document.getElementById("anchor-top");
    const content = document.getElementById("main");
    showMenu = !showMenu;
    if (showMenu) {
      navegationHeader.style.marginLeft = "0vw";
      navegationHeader.style.animationName = "showMenu";
      acnhor.style.display = `none`;
    } else {
      navegationHeader.style.marginLeft = "-100vw";
      navegationHeader.style.animationName = "hideMenu";
      acnhor.style.display = `block`;
    }
  }

  function closeMenu() {
    if (showMenu) toggleMenu();
  }

  function toggleSave(checkbox, icon) {
    if(!checkbox.checked){
      icon.classList.remove('bi-bookmark-fill');
      icon.classList.add('bi-bookmark')
    }else{
      icon.classList.remove('bi-bookmark');
      icon.classList.add('bi-bookmark-fill')
    } 

  }

  function fixarFooter() {
    footer.classList.toggle(
      "stickyFoot",
      window.scrollY >= footer.offsetTop + footer.offsetHeight
    );
  }

  function fixarHeader() {
    header.classList.toggle("sticky", window.scrollY > header.offsetTop);
  }
});
