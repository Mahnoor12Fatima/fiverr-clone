import { GigModel } from "../models/gigModel.js";


export const createGig = async (req, res) => {
  // Only sellers can create gigs
  if (!req.isSeller) {
    return res.status(403).json({
      message: "Only sellers can create a gig",
    });
  }

  try {
    const newGig = new GigModel({
      userId: req.userId,
      ...req.body,
    });

    const savedGig = await newGig.save();

    res.status(201).json(savedGig);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteGig = async (req, res) => {
  try {
    const gig = await GigModel.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    if (gig.userId.toString() !== req.userId) {
      return res.status(403).json({
        message: "You can delete only your own gig",
      });
    }

    await GigModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Gig deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getGig = async (req, res) => {
  try {
    const gig = await GigModel.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    res.status(200).json(gig);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}; 
export const getGigs = async (req, res) => {
  const q = req.query;

  const searchText = q.search
    ? q.search.replace(/-/g, " ")
    : "";

  const filters = {
    ...(q.userId && { userId: q.userId }),

    ...(q.cat && { cat: q.cat }),

    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: Number(q.min) }),
        ...(q.max && { $lte: Number(q.max) }),
      },
    }),

    ...(searchText && {
      $or: [
        {
          title: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          desc: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          shortTitle: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          shortDesc: {
            $regex: searchText,
            $options: "i",
          },
        },
      ],
    }),
  };

  try {
    const gigs = await GigModel.find(filters).sort({
      [q.sort || "createdAt"]: -1,
    });

    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};