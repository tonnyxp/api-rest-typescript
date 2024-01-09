import { Router } from "express";
import { StorageController } from "../controllers/storage.controller";
import { checkJwt } from "../middlewares/session";
import { multerMiddleware } from "../middlewares/storage";

const router = Router();
/**
 * http://localhost:3000/api/upload
 */

router.post(
  "/",
  checkJwt,
  multerMiddleware.single("file"),
  StorageController.upload
);

router.delete("/:id", checkJwt, StorageController.delete);

export default router;
