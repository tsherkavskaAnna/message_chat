const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("🟢 Database connection successful");
  } catch (error) {
    console.log("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
