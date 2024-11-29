import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Intenral Server Error", success: false });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userToDeleteId = req.params.id;
    const { loggedInUserId } = req.body;
    const loggedInUser = await User.findById(loggedInUserId);
    if (!loggedInUser)
      return res
        .status(404)
        .json({ message: "Logged In user not found", success: false });
    const userToDelete = await User.findById(userToDeleteId);
    if (!userToDelete)
      return res
        .status(404)
        .json({ message: "User To delete not found", success: false });
    if (
      loggedInUser._id.toString() === userToDelete._id.toString() &&
      loggedInUser.role === "Admin"
    ) {
      return res
        .status(403)
        .json({ message: "you can not delete yourself", success: false });
    }
    const user = await User.findByIdAndDelete(userToDeleteId);
    return res
      .status(200)
      .json({ message: "user delete successfully ", user, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Intenral Server Error", success: false });
  }
};

export const changeUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { loggedInUserId, status } = req.body;

    if (userId === loggedInUserId) {
      return res
        .status(403)
        .json({ message: "You cannot change your status.", success: false });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    return res
      .status(200)
      .json({
        message: "User status updated successfully",
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { loggedInUserId, role } = req.body;
    if (userId === loggedInUserId) {
      return res
        .status(403)
        .json({
          message: "Admins cannot change their own role.",
          success: false,
        });
    }
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    return res
      .status(200)
      .json({ message: "User role update successfully", user, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
