import axios from "axios";

export default class RecipeManager {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const recipeDetails = await this.getRecipeDetails();
      this.updateSavedRecipesUI(recipeDetails.savedRecipes);
      this.updateUpvotesUI(recipeDetails.upvoted);
      this.updateDownvotesUI(recipeDetails.downvoted);
      this.addCheckboxListeners();
    } catch (error) {
      console.error("Erro ao inicializar receitas:", error);
    }
  }

  async getRecipeDetails() {
    try {
      const response = await axios.get('/recipes/getRecipeDetails');
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar receitas salvas:", error);
      throw error;
    }
  }

  updateSavedRecipesUI(savedRecipes) {
    savedRecipes.forEach(id => {
      const checkbox = document.getElementById(`save-${id}`);
      if (checkbox) {
        const icon = checkbox.parentElement.querySelector(".saveRecipeIcon");
        checkbox.checked = true;
        icon.classList.remove("bi-bookmark");
        icon.classList.add("bi-bookmark-fill");
      }
    });
  }

  updateUpvotesUI(upvotedRecipes) {
    upvotedRecipes.forEach(id => {
      const checkbox = document.getElementById(`up-${id}`);
      if (checkbox) {
        const icon = checkbox.parentElement.querySelector(".upRecipeIcon");
        checkbox.checked = true;
        icon.classList.remove("bi-arrow-up-square");
        icon.classList.add("bi-arrow-up-square-fill");
      }
    });
  }

  updateDownvotesUI(downvotedRecipes) {
    downvotedRecipes.forEach(id => {
      const checkbox = document.getElementById(`down-${id}`);
      if (checkbox) {
        const icon = checkbox.parentElement.querySelector(".downRecipeIcon");
        checkbox.checked = true;
        icon.classList.remove("bi-arrow-down-square");
        icon.classList.add("bi-arrow-down-square-fill");
      }
    });
  }

  addCheckboxListeners() {
    const buttons = document.querySelectorAll("input[type=checkbox]");
    if (buttons) {
      buttons.forEach((button) => {
        if (button.classList.contains("saveRecipeButton")) {
          button.addEventListener("click", () => this.handleSave(button));
        } else if (button.classList.contains("upRecipeButton")) {
          button.addEventListener("click", () => this.handleVote(button, 'up'));
        } else if (button.classList.contains("downRecipeButton")) {
          button.addEventListener("click", () => this.handleVote(button, 'down'));
        }
      });
    }
  }

  async handleSave(saveButton) {
    const csrf = saveButton.closest(".content-box").querySelector("input[name=_csrf]").value;
    const endpoint = saveButton.checked ? "/recipes/save" : "/recipes/unsave";
    const recipeID = saveButton.closest(".content-box").getAttribute("id");
    const payload = { recipeID, _csrf: csrf };

    try {
      const response = await axios.post(endpoint, payload);
      console.log(response.data.message);
      this.updateSaveUI(saveButton, saveButton.checked);
    } catch (error) {
      this.handleSaveError(error, saveButton.checked);
    }
  }

  async handleVote(button, type) {
    const endpoint = button.checked ? `/recipes/${type}vote` : `/recipes/un${type}vote`;
    const recipeID = this.getRecipeID(button);
    const payload = { recipeID, _csrf: this.getCsrfToken(button) };

    try {
      const response = await axios.post(endpoint, payload);
      console.log(response.data.message);
      this.updateVoteUI(button, `.${type}RecipeIcon`, button.checked);
    } catch (error) {
      this.handleError(error, button.checked ? `${type}votar` : `des${type}votar`);
    }
  }

  handleSaveError(error, isChecked) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    } else {
      console.error(`Erro ao ${isChecked ? "salvar" : "remover"} receita:`, error);
    }
  }

  handleError(error, action) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    } else {
      console.error(`Erro ao ${action} receita:`, error);
    }
  }

  updateSaveUI(checkbox, isChecked) {
    const icon = checkbox.parentElement.querySelector(".saveRecipeIcon");
    if (isChecked) {
      icon.classList.remove("bi-bookmark");
      icon.classList.add("bi-bookmark-fill");
    } else {
      icon.classList.remove("bi-bookmark-fill");
      icon.classList.add("bi-bookmark");
    }
  }

  updateVoteUI(checkbox, isChecked) {
    if (checkbox.classList.contains("upRecipeButton")) this.upvoteUI(checkbox);
    if (checkbox.classList.contains("downRecipeButton")) this.downvoteUI(checkbox);
  }

  upvoteUI(checkbox) {
    const icon = checkbox.parentElement.querySelector(".upRecipeIcon");
    if (checkbox.checked) {
      icon.classList.remove("bi-arrow-up-square");
      icon.classList.add("bi-arrow-up-square-fill");
    } else {
      icon.classList.remove("bi-arrow-up-square-fill");
      icon.classList.add("bi-arrow-up-square");
    }
  }

  downvoteUI(checkbox) {
    const icon = checkbox.parentElement.querySelector(".downRecipeIcon");
    if (checkbox.checked) {
      icon.classList.remove("bi-arrow-down-square");
      icon.classList.add("bi-arrow-down-square-fill");
    } else {
      icon.classList.remove("bi-arrow-down-square-fill");
      icon.classList.add("bi-arrow-down-square");
    }
  }

  getRecipeID(element) {
    return element.closest(".content-box").getAttribute("id");
  }

  getCsrfToken(element) {
    return element.closest(".content-box").querySelector("input[name=_csrf]").value;
  }

}