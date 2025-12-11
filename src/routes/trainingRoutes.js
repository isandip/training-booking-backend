const express = require("express");
const router = express.Router();
const { getTrainings } = require("../controllers/trainingController");

// GET /trainings
router.get("/", getTrainings);

module.exports = router;
