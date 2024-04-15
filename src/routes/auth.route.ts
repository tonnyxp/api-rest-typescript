import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateRegister, validateLogin } from "../validators/auth.validator";

const router = Router();
/**
 * http://localhost:3000/api/auth
 */

router.post("/register", validateRegister, AuthController.register);
router.post("/login", validateLogin, AuthController.login);

router.get("/profile", AuthController.profile);
router.get("/refreshtoken", AuthController.refreshToken);

export default router;
