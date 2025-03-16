const mongoose = require("mongoose");

const connectionOptions = {
  dbName: process.env.NODE_ENV === "production" ? "aavishkar25" : "test",
};

async function connectDatabase(uri) {
  if (!uri || uri === "") {
    console.error("Please provide a valid MongoDB URI");
    return;
  }
  try {
    await mongoose.connect(uri, connectionOptions);
    console.log("✅ MongoDB Connected Successfully");

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Connection Error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB Disconnected");
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
  }
}

module.exports = { connectDatabase };
