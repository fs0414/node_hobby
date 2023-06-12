import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripeSecret = process.env.SECRET_KEY || "";

export const stripeClient = new Stripe(stripeSecret, {
  apiVersion: "2022-11-15",
});
