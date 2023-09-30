import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";

export const updateDoctorController = async (req, res) => {
  const id = req.params.id;
  let doctorDetails = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(doctorDetails.password, salt);
    doctorDetails.password = hashPassword;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: doctorDetails },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Update Successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to update. Server Error",
    });
  }
};

export const deleteDoctorController = async (req, res) => {
  const { id } = req.params;
  try {
    await Doctor.findByIdAndDelete(id);
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to delete. Server Error",
    });
  }
};

export const getSingleDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id).select("-password");
    if (!doctor) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Doctor found",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Server Error",
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    if (doctors.length < 1) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "No Doctor has been created",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Doctors found",
      data: doctors,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Server Error",
    });
  }
};
