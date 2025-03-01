import { Router } from "express";

const router: Router = Router();

router.route("/signup").post()
router.route("/signin").post()

export default router;