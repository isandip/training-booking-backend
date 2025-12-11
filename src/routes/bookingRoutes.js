const express = require("express");
const router = express.Router();
const { bookTraining, getUserBookings } = require("../controllers/bookingController");

router.post("/:trainingId/book", bookTraining);
router.get("/user/:userId", getUserBookings);

module.exports = router;
