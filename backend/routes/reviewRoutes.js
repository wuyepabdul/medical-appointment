import express from "express";
import {
  createReview,
  getAllReviewsController,
} from "../controllers/reviewController.js";
import { authenticate, restrict } from "../middlewares/verifyToken.js";

//enable access to doctor's id
const router = express.Router({ mergeParams: true }); // this makes sure that parameters from the parent routes are accessisble in the nested routes

router
  .route("/")
  .get(getAllReviewsController)
  .post(authenticate, restrict(["patient"]), createReview);

export default router;
