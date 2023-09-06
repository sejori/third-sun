import { Handler } from "peko"
import Stripe from "npm:stripe"

const {
  STRIPE_API_KEY
} = Deno.env.toObject()

const stripe = new Stripe(
  STRIPE_API_KEY,
  {
    apiVersion: "2023-08-16"
  }
)

// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
export function checkout(price_id: string): Handler {
  return async () => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://iiisun.art/success`,
      cancel_url: `https://iiisun.art/cancel`,
    });

    return session.url 
      ? Response.redirect(session.url)
      : Response.redirect("/cancel")
  }
};