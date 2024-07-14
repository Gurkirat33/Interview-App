import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
import userRoutes from "./routes/user.route.js";
app.use("/api/v1/users", userRoutes);

export { app };
