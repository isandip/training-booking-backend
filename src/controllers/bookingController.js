const trainings = require("../data/trainings");
const bookings = require("../data/bookings");
const users = require("../data/users"); // dynamic users

// Helper functions
const findUserById = (id) => users.find(u => u.id === id);
const findTrainingById = (id) => trainings.find(t => t.id === id);

// Book a training for a user
exports.bookTraining = (req, res) => {
  const trainingId = parseInt(req.params.trainingId);
  const userId = parseInt(req.body.userId);

  const user = findUserById(userId);
  if (!user) return res.status(400).json({ message: "Invalid user ID" });

  const training = findTrainingById(trainingId);
  if (!training) return res.status(404).json({ message: "Training not found" });

  if (training.availableSeats <= 0)
    return res.status(400).json({ message: "No seats available" });

  const alreadyBooked = bookings.find(
    b => b.userId === userId && b.trainingId === trainingId
  );
  if (alreadyBooked)
    return res.status(400).json({ message: "User already booked this training" });

  training.availableSeats--;

  const newBooking = {
    trainingId: training.id,
    trainingTitle: training.title,
    userId: user.id,
    userName: user.name
  };

  bookings.push(newBooking);

  res.json({ message: "Booking successful", booking: newBooking, remainingSeats: training.availableSeats });
};

// Get all bookings for a user
exports.getUserBookings = (req, res) => {
  const userId = parseInt(req.params.userId);

  const user = findUserById(userId);
  if (!user) return res.status(400).json({ message: "Invalid user ID" });

  const userBookings = bookings
    .filter(b => b.userId === userId)
    .map(b => ({
      trainingId: b.trainingId,
      trainingTitle: b.trainingTitle
    }));

  res.json({ user, bookings: userBookings });
};

// Cancel a booking
exports.cancelBooking = (req, res) => {
  const trainingId = parseInt(req.params.trainingId);
  const userId = parseInt(req.body.userId);

  const user = findUserById(userId);
  if (!user) return res.status(400).json({ message: "Invalid user ID" });

  const training = findTrainingById(trainingId);
  if (!training) return res.status(404).json({ message: "Training not found" });

  const bookingIndex = bookings.findIndex(
    b => b.userId === userId && b.trainingId === trainingId
  );

  if (bookingIndex === -1)
    return res.status(400).json({ message: "Booking not found for this user" });

  bookings.splice(bookingIndex, 1); // remove booking
  training.availableSeats++; // release the seat

  res.json({
    message: "Booking canceled successfully",
    training,
    user,
    remainingSeats: training.availableSeats
  });
};
