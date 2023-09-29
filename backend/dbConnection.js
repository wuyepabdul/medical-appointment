import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.log("error", error.message);
  }
};
