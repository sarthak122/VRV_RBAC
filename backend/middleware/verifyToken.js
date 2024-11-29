import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ messsage: "'Unauthorized: No token provided'" });
    }

    const decoded = jwt.verify(token, process.env.SECKRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ messsage: "'user not found'" });
    }

    if (user.role !== "Admin") {
      return res
        .status(403)
        .json({ messsage: "Unauthorized: User is not an admin" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const IsUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ messsage: "'Unauthorized: No token provided'" });
    }

    const decoded = jwt.verify(token, process.env.SECKRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ messsage: "'user not found'" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

export { isAdmin, IsUser };
