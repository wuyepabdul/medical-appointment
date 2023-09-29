import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
