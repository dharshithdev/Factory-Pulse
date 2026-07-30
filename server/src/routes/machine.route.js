const express = require("express");
const machineController = require("../controllers/machine.controller");
const validate = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");

const { createMachineSchema, updateMachineSchema } = require("../validators/machine.validator");

const router = express.Router();

router.post("/", validate(createMachineSchema), machineController.createMachine);

router.get("/", machineController.getAllMachines);

router.get("/:id", validateObjectId, machineController.getMachineById);

router.put("/:id", validateObjectId, validate(updateMachineSchema), machineController.updateMachine);

router.delete("/:id", validateObjectId, machineController.deleteMachine);

module.exports = router;