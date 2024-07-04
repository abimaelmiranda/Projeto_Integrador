import { Router } from "express";
import multer from "multer";

import recipeController from "../controllers/RecipeController";
import { loginRequired } from "../middlewares/middlewares";
import multerConfig from "../config/multer";

const router = Router();

const upload = multer(multerConfig);

router.get("/", recipeController.show);
router.post("/:id/recipe-submit", loginRequired, upload.single('recipeImage'), recipeController.store);
router.post("/save", loginRequired, recipeController.save);
router.post("/save", loginRequired, recipeController.save);
router.post("/unsave", loginRequired, recipeController.unsave);
router.post("/upvote", loginRequired, recipeController.upvote);
router.post("/unupvote", loginRequired, recipeController.unUpvote);
router.post("/downvote", loginRequired, recipeController.downvote);
router.post("/undownvote", loginRequired, recipeController.unDownvote);
router.get("/getRecipeDetails", loginRequired, recipeController.getRecipeDetails);

export default router;
