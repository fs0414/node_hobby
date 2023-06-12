import express from "express";
const router = express.Router();
import { ProductController } from "../../api/controller/ProductController";

const productContext = new ProductController();

router.get("/customers", productContext.getCustomers);
router.get("/products", productContext.getProducts);

router.post(
  "/payment/create-checkout-session",
  productContext.buyCheckoutPayment
);

router.post(
  "/subscription/create-checkout-session",
  productContext.buyCheckoutSubscription
);

module.exports = router;
