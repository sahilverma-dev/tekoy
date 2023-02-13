import mongoose from "mongoose";

mongoose.set("strictQuery", true);

async function connectDB(): Promise<void> {
  try {
    if (process.env.MONGO_URI) {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`Database is connected to ${conn.connection.host}`.bgGreen);
    }
  } catch (error: any) {
    console.log(error.message.red);
    process.exit(1);
  }
}

export { connectDB };
