const evaluateTemperatureRule = require("./temperature.rule");
const evaluatePressureRule = require("./pressure.rule");
const evaluateRPMRule = require("./rpm.rule");
const evaluatePowerRule = require("./power.rule");

const evaluateRules = (machine, reading) => {

    const alerts = [];

    const rules = [
        evaluateTemperatureRule,
        evaluatePressureRule,
        evaluateRPMRule,
        evaluatePowerRule
    ];

    for (const rule of rules) {

        const result = rule(machine, reading);

        if (result) {
            alerts.push(result);
        }
    }

    return alerts;
};

module.exports = evaluateRules;