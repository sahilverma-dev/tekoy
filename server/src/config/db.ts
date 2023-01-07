import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async (): Promise<void> => {
  try {
    if (process.env.MONGO_URI) {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.black);
    }
  } catch (error) {
    console.log(`${error}`.red);
    process.exit(1);
  }
};

export { connectDB };
