import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createRoom, getRoom, getRoomChats } from "../controllers/room.controller";

const router: Router = Router();

router.route("/create-room").post(authMiddleware, createRoom);
router.route("/chat/:roomId").get(authMiddleware, getRoomChats);
router.route("/:slug").get(authMiddleware, getRoom);

export default router;