const express = require("express");
const router = express.Router();
const { bookTraining, getUserBookings, cancelBooking } = require("../controllers/bookingController");

// POST /bookings/:trainingId/book
router.post("/:trainingId/book", bookTraining);

// POST /bookings/:trainingId/cancel
router.post("/:trainingId/cancel", cancelBooking);

// GET /bookings/user/:userId
router.get("/user/:userId", getUserBookings);

module.exports = router;
