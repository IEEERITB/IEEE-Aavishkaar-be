const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/connect_mongo");
require("dotenv-flow").config({ path: "../" });//dotenv is used to load environment variables from a .env file into process.env

const app = express();
const port = 8000;

app.use(cors()); //cors temperory set to all origns for development
app.use(express.json());

//main routes
const eventRoutes= require('./routes/eventRoutes');

//replace the "" with the mongo uri or make a .env file and add the uri there
connectDatabase(process.env.MONGO_URI ? process.env.MONGO_URI : "");

//default route, use express router for other routes
app.get("/", (req, res) => {
  res.json({ message: "Aaavishkar Backend" }).status(200);
});

//APIs
app.use('/aavishkar/events',eventRoutes);

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
