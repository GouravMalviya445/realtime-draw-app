import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createRoom } from "../controllers/room.controller";

const router: Router = Router();

router.route("/create-room").post(authMiddleware, createRoom);

export default router;