const machineService = require("../services/machine.services");

const createMachine = async (req, res, next) => {
    try {
        const machine = await machineService.createMachine(req.body);

        res.status(201).json({
            success: true,
            data: machine
        });
    } catch (error) {
        next(error);
    }
};

const getAllMachines = async (req, res, next) => {
    try {
        const machines = await machineService.getAllMachines();

        res.status(200).json({
            success: true,
            data: machines
        });
    } catch (error) {
        next(error);
    }
};

const getMachineById = async (req, res, next) => {
    try {
        const machine = await machineService.getMachineById(req.params.id);

        res.status(200).json({
            success: true,
            data: machine
        });
    } catch (error) {
        next(error);
    }
};

const updateMachine = async (req, res, next) => {
    try {
        const machine = await machineService.updateMachine(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            data: machine
        });
    } catch (error) {
        next(error);
    }
};

const deleteMachine = async (req, res, next) => {
    try {
        await machineService.deleteMachine(req.params.id);

        res.status(200).json({
            success: true,
            message: "Machine deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine
};