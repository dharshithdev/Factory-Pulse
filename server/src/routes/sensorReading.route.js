const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");

const sensorReadingController = require("../controllers/sensorReading.controller");
const {createSensorReadingSchema} = require("../validators/sensorReading.validator"); 

router.post("/", validate(createSensorReadingSchema), sensorReadingController.createSensorReading);

router.get("/machine/:machineId", validateObjectId("machineId"), sensorReadingController.getReadingsByMachine);

router.get("/machine/:machineId/latest", validateObjectId("machineId"), sensorReadingController.getLatestReading);

module.exports = router; 