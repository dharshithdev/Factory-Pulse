const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");
const sensorReadingController = require("../controllers/sensorReading.controller");
const {createSensorReadingSchema} = require("../validators/sensorReading.validator"); 
const protect = require("../middlewares/auth.middleware");


router.post("/", validate(createSensorReadingSchema), sensorReadingController.createSensorReading);
router.get("/machine/:machineId", protect, validateObjectId("machineId"), sensorReadingController.getReadingsByMachine);
router.get("/machine/:machineId/latest", protect, validateObjectId("machineId"), sensorReadingController.getLatestReading);

module.exports = router; 