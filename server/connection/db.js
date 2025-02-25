import mongoose from "mongoose";
async function Connection() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected succefully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(2);
  }
}
export default Connection;
