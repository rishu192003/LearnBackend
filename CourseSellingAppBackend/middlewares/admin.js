import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import { JWT_ADMIN_PASSWORD } from "../config.js";

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in",
    });
  }
}

export default adminMiddleware;
