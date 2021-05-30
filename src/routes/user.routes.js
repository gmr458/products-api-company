import { Router } from "express";
import * as middlewares from "../middlewares";
import * as userControllers from "../controllers/user.controllers";

const router = Router();

router.post(
	"/create",
	[
		middlewares.authJWT.verifyToken,
		middlewares.authJWT.isAdmin,
		middlewares.verifyExistenceOfRoles,
		middlewares.verifyExistenceOfUsername,
		middlewares.verifyExistenceOfEmail,
	],
	userControllers.createUser
);

export default router;
