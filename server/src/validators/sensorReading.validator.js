const Joi = require("joi");

const createSensorReadingSchema = Joi.object({
    machine: Joi.string().required(),

    temperature: Joi.number().required(),

    pressure: Joi.number().required(),

    rpm: Joi.number().required(),

    power: Joi.number().required(),

    productionCount: Joi.number().min(0).required(),

    status: Joi.string()
        .valid("Running", "Idle", "Stopped", "Maintenance")
        .required()
});

module.exports = {
    createSensorReadingSchema
};