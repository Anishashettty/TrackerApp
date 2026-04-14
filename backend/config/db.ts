import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("mongoDB connected");
  } catch (error: any) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;