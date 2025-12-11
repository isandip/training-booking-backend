const trainings = require("../data/trainings");

exports.getTrainings = (req, res) => {
  res.json(trainings);
};
