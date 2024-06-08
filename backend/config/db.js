const mongoose = require("mongoose"); // This line imports the "mongoose" library
const config = require("config"); // This line imports the "config" library
const db = "mongodb://localhost:27017"; // This line retrieves the MongoDB connection URI from the configuration file

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("MongoDB connected....");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
