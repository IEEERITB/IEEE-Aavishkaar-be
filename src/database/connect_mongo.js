// Code to connect to MongoDB database
const mongoose = require("mongoose");

const connectionOptions = {
  dbName: process.env.NODE_ENV === "production" ? "aavishkaar" : "test",
};

//The uri is the connection string that is used to connect to the MongoDB database.
async function connectDatabase(uri) {
  if (!uri || uri == "") {
    console.error("Please provide a valid MongoDB URI");
    return;
  }
  try {
    //create connection with mongodb
    await mongoose.connect(uri, connectionOptions);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}

// The connectDatabase function is exported so that it can be used in the index.js file.
module.exports = { connectDatabase };
