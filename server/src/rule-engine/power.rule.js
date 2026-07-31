const evaluatePowerRule = (machine, reading) => {

    if (reading.power <= machine.maxPower) {
        return null;
    }

    return {
        type: "POWER",
        severity: "WARNING",
        title: "High Power Consumption",
        message: `${machine.machineCode} exceeded maximum power usage.`,
        value: reading.power,
        threshold: machine.maxPower
    };
};

module.exports = evaluatePowerRule;