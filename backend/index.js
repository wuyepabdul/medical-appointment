import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import moongoose from "mongoose";
import dotenv from "dotenv";
import { dbConnect } from "./dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
};

app.get("/api", (req, res) => {
  res.send("Welcome to medicare API");
});


dbConnect();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.listen(port, () => {
  console.log("server listening at " + port);
});
