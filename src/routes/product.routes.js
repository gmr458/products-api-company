import { Router } from "express";
import * as productControllers from "../controllers/product.controllers";

const router = Router();

router.route("/get-all").get(productControllers.getProducts);

router.route("/create").post(productControllers.createProduct);

router.route("/get/:productId").get(productControllers.getProductByiD);

router.route("/update/:productId").put(productControllers.updateProductByiD);

router.route("/delete/:productId").delete(productControllers.deleteProductByiD);

export default router;
