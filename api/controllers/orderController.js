import { OrderModel } from "../models/orderModel.js";
import { GigModel } from "../models/gigModel.js";

import Stripe from "stripe";
export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE);

    const gig = await GigModel.findById(req.params.id);

    if (!gig) {
      return res.status(404).json("Gig not found");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: gig.title,
            },
            unit_amount: gig.price * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: `http://localhost:5173/gig/${gig._id}`,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
export const intent = async (req, res) => {
  try {
    console.log("Gig ID:", req.params.id);
    console.log("User ID:", req.userId);

    const stripe = new Stripe(process.env.STRIPE);

    const gig = await GigModel.findById(req.params.id);

    console.log("Gig:", gig);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("Payment Intent Created:", paymentIntent.id);

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
// export const createOrder = async (req, res) => {
//   try {
//     const gig = await GigModel.findById(req.params.gigId);

//     if (!gig) {
//       return res.status(404).json({
//         message: "Gig not found",
//       });
//     }

//     if (gig.userId === req.userId) {
//       return res.status(403).json({
//         message: "You cannot buy your own gig",
//       });
//     }


//     const savedOrder = await newOrder.save();

//     res.status(201).json(savedOrder);
//   } catch (err) {
//     console.log(err);

//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find(
      req.isSeller
        ? { sellerId: req.userId }
        : { buyerId: req.userId }
    );

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const confirm = async (req, res) => {
  try {
    await OrderModel.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).json("Order confirmed");
  } catch (err) {
    res.status(500).json(err.message);
  }
};