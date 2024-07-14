import { User } from "../models/user.model.js";
import { sendError } from "../utils/apiError.js";
import { sendResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessTokenRefreshToken = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(`Error generating tokens: ${error.message}`);
  }
};

export const signInUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(404).json(sendError(404, "Please fill all the fields"));
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(403).json(sendError(403, "User already exists"));
  }

  const userCreated = await User.create({ email, password, name });

  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
    userCreated
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(sendResponse(200, "User created successfully", {}));
});

export const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json(sendResponse(200, "User fetched successfully", user));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json(sendError(404, "Please fill all the fields"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(sendError(404, "User not found"));
  }

  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) {
    return res.status(401).json(sendError(401, "Invalid password"));
  }
  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
    user
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(sendResponse(200, "User logged in successfully", {}));
});

export const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json(sendError(404, "User not found"));
  }

  user.refreshToken = null;

  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(sendResponse(200, "User logged out successfully", {}));
});
