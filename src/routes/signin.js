import { Router } from "express";
import signinController from "../controllers/SigninController";

const router = Router();

router.get("/", signinController.index);
router.post("/", signinController.store);


export default router;
