const express = require("express");
const machineController = require("../controllers/machine.controller");

const router = express.Router();

router.post("/", machineController.createMachine);

router.get("/", machineController.getAllMachines);

router.get("/:id", machineController.getMachineById);

router.put("/:id", machineController.updateMachine);

router.delete("/:id", machineController.deleteMachine);

module.exports = router;