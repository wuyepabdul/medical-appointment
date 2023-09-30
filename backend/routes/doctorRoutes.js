import express from "express";
import {
  deleteDoctorController,
  getAllDoctors,
  getSingleDoctor,
  updateDoctorController,
} from "../controllers/doctorController.js";
import { authenticate, restrict } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/:id", getSingleDoctor);

router.get("/", getAllDoctors);

router.put("/:id", authenticate, restrict(["doctor"]), updateDoctorController);

router.delete(
  "/:id",
  authenticate,
  restrict(["doctor"]),
  deleteDoctorController
);

export default router;
