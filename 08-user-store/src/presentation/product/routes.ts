import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services/product/product.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ProductService();
    const controller = new ProductController(service);

    router.post('/', [AuthMiddleware.validateJWT], controller.createProduct);
    router.get('/', [AuthMiddleware.validateJWT], controller.getProducts);

    return router;
  }
}