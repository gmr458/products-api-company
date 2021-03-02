import { Router } from "express";
import * as productControllers from "../controllers/product.controllers";

const router = Router();

router.route("/")
  .get(productControllers.getProducts)
  .post(productControllers.createProduct);

router.route("/:productId")
  .get(productControllers.getProductByiD)
  .put(productControllers.updateProductByiD)
  .delete(productControllers.deleteProductByiD);

export default router;