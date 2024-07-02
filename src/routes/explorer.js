import { Router } from "express";
import explorerController from "../controllers/explorerController";
const router = Router();

router.get("/", explorerController.index);

export default router