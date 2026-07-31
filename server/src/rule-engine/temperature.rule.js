const evaluateTemperatureRule = (machine, reading) => {

    if (reading.temperature <= machine.maxTemperature) {
        return null;
    }

    return {
        type: "TEMPERATURE",
        severity: "WARNING",
        title: "High Temperature",
        message: `${machine.machineCode} exceeded maximum temperature.`,
        value: reading.temperature,
        threshold: machine.maxTemperature
    };
};

module.exports = evaluateTemperatureRule;