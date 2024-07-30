import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  interviewCreator: {
    type: String,
    required: true,
  },
  interviewId: {
    type: String,
    required: true,
  },
  participants: [String],
});

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
