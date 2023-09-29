import express from "express";
import {
  deleteDoctorController,
  getAllDoctors,
  getSingleDoctor,
  updateDoctorController,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/:id", getSingleDoctor);

router.get("/", getAllDoctors);

router.put("/:id", updateDoctorController);

router.delete("/:id", deleteDoctorController);

export default router;
