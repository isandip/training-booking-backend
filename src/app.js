const express = require("express");
const cors = require("cors");

const trainingRoutes = require("./routes/trainingRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/trainings", trainingRoutes);
app.use("/trainings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Training Booking API is running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
