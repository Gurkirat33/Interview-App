import { io } from "../app.js";
import { sendError } from "../utils/apiError.js";
import { sendResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v6 as uuidv6 } from "uuid";
import Interview from "../models/Interview.model.js"; // Make sure to import your Interview model

export const createInterview = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json(sendError(404, "User not found"));
  }

  const numberOfInterviewsCreated = user.interviews.length;
  const pricingType = user.pricingType;

  if (pricingType === "free" && numberOfInterviewsCreated >= 3) {
    return res
      .status(403)
      .json(sendError(403, "Maximum number of interviews reached"));
  }

  // Generate a new UUID for the interview ID
  const interviewId = uuidv6();

  // const newInterview = new Interview({
  //   _id: interviewId,
  //   participants: [],
  // });

  // await newInterview.save();

  res
    .status(200)
    .json(sendResponse(200, "Interview created successfully", interviewId));
});
