import { Router } from "express";
import { userSignin, userSignup } from "../controllers/user.controller";

const router: Router = Router();

router.route("/signup").post(userSignup);
router.route("/signin").post(userSignin);

export default router;