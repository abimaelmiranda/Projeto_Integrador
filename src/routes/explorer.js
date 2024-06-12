import { Router } from "express";
import explorerController from "../controllers/ExplorerController";
const router = Router();

router.get("/", explorerController.index);

export default router