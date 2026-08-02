const express = require("express");
const machineController = require("../controllers/machine.controller");
const validate = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");
const { createMachineSchema, updateMachineSchema } = require("../validators/machine.validator");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protect);

router.post("/", validate(createMachineSchema), machineController.createMachine);
router.get("/", machineController.getAllMachines);
router.patch("/:id/toggle", validateObjectId("id"), machineController.toggleMachineStatus);
router.get("/:id", validateObjectId("id"), machineController.getMachineById);
router.put("/:id", validateObjectId("id"), validate(updateMachineSchema), machineController.updateMachine);
router.delete("/:id", validateObjectId("id"), machineController.deleteMachine);

module.exports = router;