import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  interviewCreator: {
    type: String,
  },
  interviewId: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
  participants: [String],
});

export const Interview = mongoose.model("Interview", interviewSchema);
