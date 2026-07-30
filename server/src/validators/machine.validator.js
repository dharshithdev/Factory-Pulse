const Joi = require("joi");

const createMachineSchema = Joi.object({
    machineCode: Joi.string()
        .pattern(/^M-\d+$/)
        .required()
        .messages({
            "string.empty": "Machine code is required.",
            "string.pattern.base": "Machine code must be in the format M-101."
        }),

    maxTemperature: Joi.number()
        .min(0)
        .required(),

    maxPressure: Joi.number()
        .min(0)
        .required(),

    maxRPM: Joi.number()
        .min(0)
        .required(),

    maxPower: Joi.number()
        .min(0)
        .required(),

    maxProductionPerMinute: Joi.number()
        .min(0)
        .required()
});

const updateMachineSchema = Joi.object({
    maxTemperature: Joi.number().min(0),

    maxPressure: Joi.number().min(0),

    maxRPM: Joi.number().min(0),

    maxPower: Joi.number().min(0),

    maxProductionPerMinute: Joi.number().min(0),

    isActive: Joi.boolean()
}).min(1);

module.exports = {
    createMachineSchema,
    updateMachineSchema
};