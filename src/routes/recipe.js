import { Router } from "express";
import multer from "multer";

import recipeController from "../controllers/RecipeController";
import { loginRequired } from "../middlewares/middlewares";
import multerConfig from "../config/multer";

const router = Router();

const upload = multer(multerConfig);


router.post("/:id/recipe-submit", loginRequired, upload.single('recipeImage'), recipeController.store);
router.post("/save", loginRequired, recipeController.save);
router.post("/unsave", loginRequired, recipeController.unsave);
router.get("/getSavedRecipes", loginRequired, recipeController.getSavedRecipes);

export default router;
