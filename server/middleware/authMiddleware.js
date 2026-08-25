import User from "../models/User.js";
import jwt from "jsonwebtoken";


const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, error: "token not valid" });
    }

    const user = await User.findById({ _id: decoded._id }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "token not valid" });
  }
};

export default verifyUser;
