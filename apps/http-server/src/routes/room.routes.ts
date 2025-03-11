import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createRoom, getRoomChats } from "../controllers/room.controller";

const router: Router = Router();

router.route("/create-room").post(authMiddleware, createRoom);
router.route("/chat/:roomId").get(authMiddleware, getRoomChats);

export default router;