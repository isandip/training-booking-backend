let trainings = require("../data/trainings");
let bookings = require("../data/bookings");

exports.bookTraining = (req, res) => {
  const trainingId = parseInt(req.params.trainingId);
  const userId = parseInt(req.body.userId);

  const training = trainings.find(t => t.id === trainingId);

  if (!training) {
    return res.status(404).json({ message: "Training not found" });
  }

  if (training.availableSeats <= 0) {
    return res.status(400).json({ message: "No seats available" });
  }

  training.availableSeats--;

  bookings.push({
    trainingId,
    userId
  });

  res.json({ message: "Booking successful", training });
};

exports.getUserBookings = (req, res) => {
  const userId = parseInt(req.params.userId);

  const userBookings = bookings.filter(b => b.userId === userId);

  res.json(userBookings);
};
