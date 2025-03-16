const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/connect_mongo");
require("dotenv-flow").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://aavishkaar2025.onrender.com",
            "https://aavishkaar2025-fe.onrender.com",
          ]
        : "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

connectDatabase(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const Event = require("./database/schemas/Event");
    Event.find()
      .then((events) => {
        console.log(`Found ${events.length} events in the database`);
      })
      .catch((err) => {
        console.error("Error testing database connection:", err);
      });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Aavishkaar Backend" });
});

const eventRoutes = require("./routes/eventRoutes.js");
const teamRoutes = require("./routes/teamRoutes.js");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

console.log("Before registering routes...");
app.use("/aavishkaar", eventRoutes);
app.use("/aavishkaar/teams", teamRoutes);

console.log("Registered Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(
      `${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${
        middleware.route.path
      }`
    );
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((subMiddleware) => {
      if (subMiddleware.route) {
        console.log(
          `${Object.keys(subMiddleware.route.methods)
            .join(", ")
            .toUpperCase()} /aavishkaar${subMiddleware.route.path}`
        );
      }
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
