import User from "../models/UserSchema";

export const updateUserController = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Update Successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to update. Server Error",
    });
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
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

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Server Error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length < 1) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "No User has been created",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Server Error",
    });
  }
};
