import { Router } from "express";
import kitchenController from "../controllers/KitchenController";
import { loginRequired } from    "../middlewares/middlewares";

const router = Router();

router.get("/:id",loginRequired, kitchenController.index);
router.get("/:id/my-recipes", loginRequired, kitchenController.getUserRecipes);
router.get("/:id/saved-recipes", loginRequired, kitchenController.getUserSavedRecipes);


export default router;