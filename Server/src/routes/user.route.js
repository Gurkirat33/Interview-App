import { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  signInUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/VerifyToken.middleware.js";

const router = Router();

router.post("/sign-in", signInUser);
router.get("/get-user", verifyToken, getUser);
router.post("/loginUser", loginUser);
router.post("/logoutUser", verifyToken, logoutUser);

export default router;
