import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers";

const router = Router();

router.route("/signup").post(authControllers.signUp);

router.route("/signin").post(authControllers.signIn);

export default router;
