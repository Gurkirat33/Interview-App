import { User } from "../models/user.model.js";
import { sendError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      res.status(400).json(sendError(401, "Unauthorized request"));
    }

    const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedtoken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(400).json(sendError(400, "Invalid access token"));
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json(sendError(400, "Invalid access token"));
  }
});
