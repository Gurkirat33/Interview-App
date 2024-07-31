import { Router } from "express";
import {
  addRemarks,
  createInterview,
  interviewHistory,
} from "../controllers/Interview.controller.js";
import { verifyToken } from "../middlewares/VerifyToken.middleware.js";

const router = Router();

router.post("/create-interview", verifyToken, createInterview);
router.get("/interview-history", verifyToken, interviewHistory);
router.post("/add-remarks", verifyToken, addRemarks);

export default router;
