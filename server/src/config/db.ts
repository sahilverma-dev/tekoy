import mongoose from "mongoose";

mongoose.set("strictQuery", true);

async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/tekoy");
    console.log(`Database is connected to ${conn.connection.host}`.bgGreen);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
    process.exit(1);
  }
}

export { connectDB };
