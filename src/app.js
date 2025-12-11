const express = require("express");
const cors = require("cors");

const trainingRoutes = require("./routes/trainingRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/trainings", trainingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Training Booking API is running");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
