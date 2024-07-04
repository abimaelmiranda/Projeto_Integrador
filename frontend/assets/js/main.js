import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../modules/script.js';

import RecipeManager from '../modules/recipes.js';
import PostValidation from '../modules/postValidation.js';
import LoginValidation from '../modules/loginValidation.js';


const postValidation = new PostValidation('.recipe-form')
postValidation.init();

const loginValidation = new LoginValidation('.form-login')
loginValidation.init();

document.addEventListener("DOMContentLoaded", () => {
    new RecipeManager();
  });
  