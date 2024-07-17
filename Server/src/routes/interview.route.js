import { Router } from "express";
import { createInterview } from "../controllers/Interview.controller.js";
import { verifyToken } from "../middlewares/VerifyToken.middleware.js";

const router = Router();

router.post("/create-interview", verifyToken, createInterview);

export default router;
