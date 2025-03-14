import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createRoom, getRoomBySlug, getRoomChatsByRoomId, getAllRoomsCreatedByAdmin } from "../controllers/room.controller";

const router: Router = Router();

router.route("/create-room").post(authMiddleware, createRoom);
router.route("/chat/:roomId").get(authMiddleware, getRoomChatsByRoomId);
router.route("/:slug").get(authMiddleware, getRoomBySlug);
router.route("/").get(authMiddleware, getAllRoomsCreatedByAdmin);

export default router;