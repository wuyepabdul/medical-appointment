import express from "express";
import {
  createReview,
  getAllReviewsController,
} from "../controllers/reviewController";
import { authenticate, restrict } from "../middlewares/verifyToken";

const router = express.Router();

router
  .route("/")
  .get(getAllReviewsController)
  .post(authenticate, restrict(["patient"]), createReview);

export default router;
