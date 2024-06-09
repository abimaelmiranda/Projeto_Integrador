import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../modules/recipes.js'
import '../modules/script.js';

import PostValidation from '../modules/postValidation.js';
import LoginValidation from '../modules/loginValidation.js';

const postValidation = new PostValidation('.recipe-form')
postValidation.init();
const loginValidation = new LoginValidation('.form-login')
loginValidation.init();