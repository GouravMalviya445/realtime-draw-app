import { Router } from "express";

const router: Router = Router();

router.route("/signup").post()
router.route("/signin").post()
router.route("/create-room").post()

export default router;