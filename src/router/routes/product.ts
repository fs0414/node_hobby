import express from "express";
const router = express.Router();
import { ProductController } from "../../api/controller/ProductController";

const productContext = new ProductController();

router.get("/api/customers", productContext.getCustomers);
router.get("/api/products", productContext.getProducts);

router.post(
  "/payment/create-checkout-session",
  productContext.buyCheckoutPayment
);

router.post(
  "/subscription/create-checkout-session",
  productContext.buyCheckoutSubscription
);

module.exports = router;
