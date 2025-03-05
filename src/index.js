const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/connect_mongo");
require("dotenv-flow").config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure MONGO_URI is provided
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
connectDatabase(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Aavishkaar Backend" });
});

// Import and register routes
const eventRoutes = require("./routes/eventRoutes.js");
const teamRoutes = require("./routes/teamRoutes.js");

console.log("Before registering routes...");
app.use("/aavishkaar", eventRoutes);
app.use("/aavishkaar/teams", teamRoutes);

// Print registered routes
console.log("Registered Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((subMiddleware) => {
      if (subMiddleware.route) {
        console.log(`${Object.keys(subMiddleware.route.methods).join(", ").toUpperCase()} /aavishkaar${subMiddleware.route.path}`);
      }
    });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
