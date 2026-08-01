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
router.get("/:id", validateObjectId, machineController.getMachineById);
router.put("/:id", validateObjectId, validate(updateMachineSchema), machineController.updateMachine);
router.delete("/:id", validateObjectId, machineController.deleteMachine);
router.patch("/:id/toggle", validateObjectId, machineController.toggleMachineStatus);

module.exports = router;