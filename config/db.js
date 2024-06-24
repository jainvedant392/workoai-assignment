const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/workoai"
    );
    console.log(
      `MongoDB connected: ${connection.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(error);
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = { connectDB };
