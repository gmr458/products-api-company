import { Router } from "express";
import { authJWT } from "../middlewares";
import * as productControllers from "../controllers/product.controllers";

const router = Router();

router.get("/get-all", productControllers.getProducts);

router.post(
	"/create",
	[authJWT.verifyToken, authJWT.isAdmin],
	productControllers.createProduct
);

router.get("/get/:productId", productControllers.getProductByiD);

router.put(
	"/update/:productId",
	[authJWT.verifyToken, authJWT.isAdmin],
	productControllers.updateProductByiD
);

router.delete(
	"/delete/:productId",
	[authJWT.verifyToken, authJWT.isAdmin],
	productControllers.deleteProductByiD
);

export default router;
