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
    stickyFooter();
    stickyHeader();
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

  function stickyFooter() {
    footer.classList.toggle(
      "stickyFoot",
      window.scrollY >= footer.offsetTop + footer.offsetHeight
    );
  }

  function stickyHeader() {
    header.classList.toggle("sticky", window.scrollY > header.offsetTop);
  }

  const posts = document.querySelectorAll('.content-box');
  posts.forEach(post => {
      post.addEventListener('click', (e) => {
          if (!e.target.closest('.upRecipeButton, .downRecipeButton, .saveRecipeButton, .upRecipeIcon, .downRecipeIcon, .saveRecipeIcon')) {
              const postId = post.id;
              window.location.href = `/recipes?post=${postId}`;
          }
      });
  });

  const buttons = document.querySelectorAll('.upRecipeButton, .downRecipeButton, .saveRecipeButton');
  buttons.forEach(button => {
      button.addEventListener('click', (e) => {
          e.stopPropagation();
      });
  });
});
