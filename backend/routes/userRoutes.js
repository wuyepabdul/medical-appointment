import express from "express";
import {
  deleteUserController,
  getAllUsers,
  getSingleUser,
  updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getSingleUser);

router.get("/", getAllUsers);

router.put("/:id", updateUserController);

router.delete("/:id", deleteUserController);

export default router;
