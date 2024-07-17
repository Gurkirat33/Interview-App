import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    interviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    intervieweeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
    scheduledTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["created", "scheduled", "completed", "cancelled"],
      default: "created",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

interviewSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Interview = mongoose.model("Interview", interviewSchema);
