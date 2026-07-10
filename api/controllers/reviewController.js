import { ReviewModel } from "../models/reviewModel.js";
import { GigModel } from "../models/gigModel.js";

export const createReview = async (req, res) => {
  console.log("Review Request");
  console.log("User ID:", req.userId);
  console.log("Is Seller:", req.isSeller);

  if (req.isSeller) {
    return res.status(403).json({
      message: "Seller cannot create a review",
    });
  }

  try {
    const existingReview = await ReviewModel.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (existingReview) {
      return res.status(403).json({
        message: "You have already created a review for this gig",
      });
    }

    const newReview = new ReviewModel({
      userId: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });

    const savedReview = await newReview.save();

    await GigModel.findByIdAndUpdate(
      req.body.gigId,
      {
        $inc: {
          totalStars: req.body.star,
          starNumber: 1,
        },
      }
    );

    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    console.log("Requested gigId:", req.params.gigId);

    const reviews = await ReviewModel.find({
      gigId: req.params.gigId,
    });

    console.log("Found reviews:", reviews);

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const deleteReview = async (req, res) => {
  try {
    res.status(200).json({
      message: "Delete review endpoint",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};