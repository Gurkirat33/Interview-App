import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  participants: [String],
});

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
