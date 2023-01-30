import mongoose from "mongoose";

mongoose.set("strictQuery", true);

async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/tekoy");
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Data base is connected to ${conn.connection.host}`.bgGreen);
  } catch (error) {
    console.log("error".red);
    process.exit(1);
  }
}

export { connectDB };
