import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protect = (context) => {
	const { req } = context;
  const token =
    req.cookies.urlShortenerToken || req.headers.authorization?.split("")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.userId;
    } catch (error) {
      console.log(`token not valid: ${error.message}`);
		}
	} else {
    console.log("no token provided");
		throw new Error("authentication required");
	}
};

