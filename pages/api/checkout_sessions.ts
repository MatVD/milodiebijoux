import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Products } from "../../typings";
import { type } from "os";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.


      const params: any = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1M7xMIDHFDELFjfNokXjiy7O" },
          { shipping_rate: "shr_1M8gBfDHFDELFjfN3bXRltWG" },
        ],
        line_items: req.body.map((item: Products) => {
          const img = item.images[0];
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/i5ilgqfl/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.title,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
