import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../helpers/generateJwtToken.js";

export const registerController = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "User already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User Successfully Created",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error, try again later",
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not Found",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid credentials",
      });
    }

    const token = generateJwtToken(user);

    const { password, role, appointments, ...rest } = user._doc;
    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: "Login Success",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to login. Internal server error",
    });
  }
};
