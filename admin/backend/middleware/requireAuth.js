import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

/**
 * requireAuth middleware
 * - verifies Bearer token from Authorization header (or query param `token`)
 * - sets req.user to decoded payload (controller expects req.user.sub)
 */
const requireAuth = (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization || req.headers.Authorization || null;
    let token = null;

    if (authHeader && typeof authHeader === "string") {
      if (authHeader.startsWith("Bearer ")) token = authHeader.split(" ")[1];
      else token = authHeader;
    }

    if (!token && req.query?.token) token = req.query.token;

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "No token provided" });
    }

    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    const payload = jwt.verify(token, secret);

    // always attach full payload; controllers can fall back to email if sub missing
    req.user = payload;
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err.message || err);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default requireAuth;