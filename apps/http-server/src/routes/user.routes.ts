import { Router } from "express";
import { getCurrentUser, userSignin, userSignup } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = Router();

router.route("/signup").post(userSignup);
router.route("/signin").post(userSignin);

// secure routes
router.route("/current-user").get(authMiddleware, getCurrentUser)

export default router;