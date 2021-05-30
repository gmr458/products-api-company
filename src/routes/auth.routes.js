import { Router } from "express";
import * as middlewares from "../middlewares";
import * as authControllers from "../controllers/auth.controllers";

const router = Router();

router.post(
	"/signup",
	[
		middlewares.verifyExistenceOfRoles,
		middlewares.verifyExistenceOfUsername,
		middlewares.verifyExistenceOfEmail,
	],
	authControllers.signUp
);

router.post("/signin", authControllers.signIn);

export default router;
