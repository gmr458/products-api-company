import { Router } from "express";
import { authJWT } from "../middlewares";
import * as userControllers from "../controllers/user.controllers";

const router = Router();

router.post(
	"/create",
	[authJWT.verifyToken, authJWT.isAdmin],
	userControllers.createUser
);

export default router;
