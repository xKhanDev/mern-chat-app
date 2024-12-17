import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decodeToken.userId).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized: Token expired" });
      }
    }
  } catch (error) {
    console.error("Error in protectRoute:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default protectRoute;
