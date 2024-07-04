import { Router } from "express";
import loginController from "../controllers/LoginController";
const router = Router();

router.get('/', loginController.index);
router.post('/', loginController.store);
router.get('/logout', loginController.logout)


export default router;