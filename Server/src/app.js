import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import Interview from "./models/Interview.model.js";

const app = express();

const server = http.createServer(app);

// Socket.io and WebRtc
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("interview:join", async ({ interviewId }) => {
    console.log(`User joined interview: ${interviewId}`);
    // Save data to backend -TODO
    const interview = await Interview.findOne({ _id: interviewId });
    console.log(interview);
    if (!interviewId) {
      socket.emit("interview:error", {
        message: "Invalid interview ID. You are not authorized to join.",
      });
      console.log("Error in unexpected");
      return;
    }

    interview?.participants?.push(socket.id);
    await interview.save();
    let role = "user";
    if (interview?.participants?.length === 1) {
      role = "admin";
    }

    io.to(interviewId).emit("user:joined", { id: socket.id });
    socket.join(interviewId);
    io.to(socket.id).emit("interview:join", { id: interviewId, role });
  });

  socket.on("fullscreen:status", ({ interviewID, isFullscreen, isFocus }) => {
    console.log(
      `Fullscreen status for interview ${interviewID}: ${isFullscreen} - ${isFocus}`
    );
    console.log(interviewID, isFullscreen, isFocus);
    // Broadcast the fullscreen status to other users in the same interview room
    socket.to(interviewID).emit("fullscreen:status", {
      userId: socket.id,
      isFullscreen,
      isFocus,
    });
  });

  socket.on("code:output", ({ interviewId, output }) => {
    console.log("Emitting code:output:change");
    io.to(interviewId).emit("code:output:change", { output });
    console.log(output);
    console.log(interviewId);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    // console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    // console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("code:change", ({ code }) => {
    socket.broadcast.emit("code:update", { code });
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes

// User routes
import userRoutes from "./routes/user.route.js";
app.use("/api/v1/users", userRoutes);

// Interview routes
import interviewRoutes from "./routes/interview.route.js";
// import { Interview } from "./models/Interview.model.js";
app.use("/api/v1/interviews", interviewRoutes);

export { server };
