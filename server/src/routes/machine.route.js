const express = require("express");
const machineController = require("../controllers/machine.controller");
const validate = require("../middlewares/validate");

const { createMachineSchema, updateMachineSchema } = require("../validators/machine.validator");

const router = express.Router();

router.post("/", validate(createMachineSchema), machineController.createMachine);

router.get("/", machineController.getAllMachines);

router.get("/:id", machineController.getMachineById);

router.put("/:id", validate(updateMachineSchema), machineController.updateMachine);

router.delete("/:id", machineController.deleteMachine);

module.exports = router;