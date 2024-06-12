const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const headerController = require('./src/controllers/headerController');
const signInController = require('./src/controllers/signInController');
const loginController = require('./src/controllers/loginController');
const kitchenController = require('./src/controllers/KitchenController');
const { loginRequired, loginRequired2 } = require('./src/middlewares/middleware');
const recipeController = require('./src/controllers/RecipeController');



//rotas header
route.get('/', homeController.homePage);
route.get('/explorer', headerController.explorer);
route.get('/contact', headerController.contact);
route.get('/login', headerController.login);
route.get('/signin', headerController.sigin);


//rotas sign-in
route.post('/signin/submit', signInController.register);


//rotas login
route.post('/login/submit', loginController.submit);
route.get('/logout', loginController.logout);

//rotas da cozinha
route.get('/kitchen/:id', loginRequired, kitchenController.kitchen);
route.post('/kitchen/:id/recipe-submit', loginRequired, kitchenController.submit);
route.get('/kitchen/:id/myRecipes', loginRequired, kitchenController.myRecipes);


//rotas de receita
route.post('/recipeSave', loginRequired, recipeController.save);
route.post('/recipeUnsave', loginRequired, recipeController.unsave);
route.get('/getSavedRecipes', loginRequired, recipeController.getSavedRecipes);



module.exports = route;