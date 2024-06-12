import { Router } from "express";
import kitchenController from "../controllers/KitchenController";
import { loginRequired } from    "../middlewares/middlewares";

const router = Router();

router.get("/:id",loginRequired, kitchenController.index);
router.get("/:id/myRecipes", loginRequired, kitchenController.getUserRecipes);


export default router;