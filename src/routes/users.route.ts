import { Router } from "express";
import { UserController } from "../controllers/users.controller";
import { checkJwt } from "../middlewares/session";
import { validateUser } from "../validators/users.validator";

const router = Router();
/**
 * http://localhost:3000/api/users
 */
router.use(checkJwt);

router.get("/", UserController.findAll);

router.get("/:id", UserController.findOne);
router.put("/:id", validateUser, UserController.update);
router.delete("/:id", UserController.remove);

export default router;