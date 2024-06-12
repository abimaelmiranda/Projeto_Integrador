import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get('/recipes/getSavedRecipes');
    const savedRecipes = response.data; 
    
    savedRecipes.savedRecipes.forEach(id => {
      const checkbox = document.getElementById(id);
      const icon = checkbox.parentElement.querySelector(".saveRecipeIcon");
      if (checkbox) {
        checkbox.checked = true;
        icon.classList.remove("bi-bookmark");
        icon.classList.add("bi-bookmark-fill");
      }
    });
  } catch (error) {
    console.error("Erro ao carregar receitas salvas:", error);
  }

  const recipeIDInputs = document.querySelectorAll("input[type=checkbox]");

  if (recipeIDInputs) {
    recipeIDInputs.forEach((recipeIDInput) => {
      recipeIDInput.addEventListener("click", async () => {
        const csrf = recipeIDInput.closest(".content-box").querySelector("input[name=_csrf]").value;
        const endpoint = recipeIDInput.checked ? "/recipes/save" : "/recipes/unsave";
        const payload = { recipeID: recipeIDInput.id, _csrf: csrf };

        try {
          const response = await axios.post(endpoint, payload);
          console.log(response.data.message);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/login";
          } else {
            console.error(`Erro ao ${recipeIDInput.checked ? "salvar" : "remover"} receita:`, error);
          }
        }
      });
    });
  }
});