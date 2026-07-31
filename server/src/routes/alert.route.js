const express = require("express");

const router = express.Router();

const alertController = require("../controllers/alert.controller");

const validateObjectId = require("../middlewares/validateObjectId");

router.get("/", alertController.getAllAlerts);

router.get("/machine/:machineId", validateObjectId, alertController.getAlertsByMachine);

router.patch("/:id/acknowledge", validateObjectId, alertController.acknowledgeAlert);

module.exports = router;