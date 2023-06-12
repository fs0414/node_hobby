import { Request, Response } from "express";
import { stripeClient } from "../../lib/stripeClient";
import dotenv from "dotenv";
dotenv.config();

export class ProductController {
  async getCustomers(_req: Request, res: Response): Promise<void> {
    try {
      const customers = await stripeClient.customers.list({
        limit: 3,
      });
      res.status(200).json({
        customers,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async getProducts(_req: Request, res: Response): Promise<void> {
    const products = await stripeClient.products.list();
    res.status(200).json({
      products,
    });
  }

  async buyCheckoutPayment(req: Request, res: Response): Promise<void> {
    const { name, priceId, quantity, paymentType } = req.body;
    console.log("name :", name);
    console.log("priceId :", priceId);
    console.log("quantity :", quantity);
    console.log("paymentType :", paymentType);

    try {
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card", "konbini"],
        line_items: [
          {
            price: priceId,
            quantity: quantity,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:3000/productPayment/success.html`,
        cancel_url: `http://localhost:3000/productPayment/cancel.html`,
      });

      res.redirect(303, session.url || "");
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async buyCheckoutSubscription(req: Request, res: Response): Promise<void> {
    const { priceId, quantity } = req.body;
    console.log("priceId :", priceId);
    console.log("quantity :", quantity);
    console.log("BASE_URL :", process.env.BASE_URL);

    try {
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: quantity,
          },
        ],
        mode: "subscription",
        success_url: `http://localhost:3000/productSubscription/success.html`,
        cancel_url: `http://localhost:3000/productSubscription/cancel.html`,
      });
      res.redirect(303, session.url || "");
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
