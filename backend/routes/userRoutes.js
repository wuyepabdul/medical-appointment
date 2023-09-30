import express from "express";
import {
  deleteUserController,
  getAllUsers,
  getSingleUser,
  updateUserController,
} from "../controllers/userController.js";
import { authenticate, restrict } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);

router.get("/", restrict(["admin"]), getAllUsers);

router.put("/:id", restrict(["patient"]), updateUserController);

router.delete("/:id", restrict(["patient"]), deleteUserController);

export default router;
