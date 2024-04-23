import { Router } from "express";
import { checkJwt } from "../middlewares/session";
import { PermissionController } from "../controllers/permissions.controller";

const router = Router();
/**
 * http://localhost:3000/api/permissions
 */
router.use(checkJwt);

router.get("/", PermissionController.findAll);
router.post("/", PermissionController.create);

router.get("/:id", PermissionController.findOne);
router.put("/:id", PermissionController.update);
router.delete("/:id", PermissionController.remove);

export default router;
