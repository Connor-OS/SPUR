import { NextFunction, Request, Response } from "express";
import { stripe } from "../app";

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("body: ", req.query);

    const name: string = req.query["name"] as string || "";
    const total: number = parseFloat(req.query["total"] as string || "") * 100; 
    
    const transactionID: string = req.query["transactionID"] as string;
    
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: name,
            },
            unit_amount: total, // (amount in pence)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}&transactionID=${transactionID}`
    });

    res.send({clientSecret: session.client_secret});

  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

export const getStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
};
