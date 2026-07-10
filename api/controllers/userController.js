import { User } from "../models/userModel.js";

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Only allow users to delete their own account
    if (req.userId !== user._id.toString()) {
      return res.status(403).json({
        message: "You can delete only your own account",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getUser = async (req, res) => {
   const user = await User.findById(req.params.id);
   res.status(200).json(user);

};