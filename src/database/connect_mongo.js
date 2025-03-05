// Code to connect to MongoDB database
const mongoose = require("mongoose");
const Event = require("./schemas/Event");
const connectionOptions = {
  dbName: process.env.NODE_ENV === "production" ? "aavishkar25" : "test",
};

//The uri is the connection string that is used to connect to the MongoDB database.
async function connectDatabase(uri) {
  if (!uri || uri == "") {
    console.error("Please provide a valid MongoDB URI");
    return;
  }
  try {
    //create connection with mongodb
    // console.log(uri);
    await mongoose.connect(uri, connectionOptions);
    console.log("Connected to the database successfully");
    // console.log(mongoose.connection.name);
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}

// The connectDatabase function is exported so that it can be used in the index.js file.
module.exports = { connectDatabase };
