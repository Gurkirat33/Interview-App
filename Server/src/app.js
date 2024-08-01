import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import { Interview } from "./models/Interview.model.js";

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: "https://interview-app-frontend-6pl6.onrender.com",
    credentials: true,
  })
);

// Socket.io and WebRtc
export const io = new Server(server, {
  cors: {
    origin: "https://interview-app-frontend-6pl6.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("interview:join", async ({ interviewId, role, userId }) => {
    // Save data to backend -TODO
    if (role === "admin") {
      const interviewCheck = await Interview.findOne({ interviewId });
      if (interviewCheck) {
        interviewCheck.participants.push(userId);
        interviewCheck.interviewCreator = userId;
        await interviewCheck.save();
      } else {
        const interview = await Interview.create({
          interviewId,
          interviewCreator: userId,
        });
        interview?.participants?.push(userId);
        await interview.save();
      }
    } else {
      const interview = await Interview.findOne({ interviewId });
      if (!interview) {
        await Interview.create({
          interviewId,
          participants: [userId],
        });
      } else {
        interview?.participants?.push(userId);
        await interview.save();
      }
    }

    if (!interviewId) {
      socket.emit("interview:error", {
        message: "Invalid interview ID. You are not authorized to join.",
      });
      return;
    }

    // interview?.participants?.push(socket.id);
    // await interview.save();

    io.to(interviewId).emit("user:joined", { id: socket.id });
    socket.join(interviewId);
    io.to(socket.id).emit("interview:join", { id: interviewId });
  });

  socket.on("fullscreen:status", ({ interviewID, isFullscreen, isFocus }) => {
    socket.to(interviewID).emit("fullscreen:status", {
      userId: socket.id,
      isFullscreen,
      isFocus,
    });
  });

  socket.on("code:output", ({ interviewId, output }) => {
    io.to(interviewId).emit("code:output:change", { output });
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes

// Demo route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// User routes
import userRoutes from "./routes/user.route.js";
app.use("/api/v1/users", userRoutes);

// Interview routes
import interviewRoutes from "./routes/interview.route.js";
// import { Interview } from "./models/Interview.model.js";
app.use("/api/v1/interviews", interviewRoutes);

export { server };
