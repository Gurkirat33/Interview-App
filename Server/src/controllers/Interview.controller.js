import { io } from "../app.js";
import { sendError } from "../utils/apiError.js";
import { sendResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v6 as uuidv6 } from "uuid";
import { Interview } from "../models/Interview.model.js";

export const createInterview = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json(sendError(404, "User not found"));
  }

  const numberOfInterviewsCreated = await Interview.find({
    interviewCreator: user._id,
  }).countDocuments();
  const pricingType = user.pricingType;

  // Change the limit from 100 to 3-5 , it is changed for demo TODO
  if (pricingType === "free" && numberOfInterviewsCreated >= 100) {
    return res
      .status(403)
      .json(sendError(403, "Maximum number of interviews reached"));
  }

  const interviewId = uuidv6();

  res
    .status(200)
    .json(sendResponse(200, "Interview created successfully", interviewId));
});

export const interviewHistory = asyncHandler(async (req, res) => {
  const user = req.user;
  const interviews = await Interview.find({ interviewCreator: user._id });
  if (interviews.length === 0) {
    return res.status(404).json(sendError(404, "No interviews found"));
  }
  res.status(200).json(sendResponse(200, "Interview history", interviews));
});

export const addRemarks = asyncHandler(async (req, res) => {
  const { remarks, roomId } = req.body;
  const interview = await Interview.findOne({ interviewId: roomId });
  if (!interview) {
    return res.status(404).json(sendError(404, "Interview not found"));
  }

  interview.remarks = remarks;
  await interview.save();
  res.status(200).json(sendResponse(200, "Remarks added successfully", {}));
});
