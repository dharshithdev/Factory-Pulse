
const evaluatePressureRule = (machine, reading) => {

    if (reading.pressure <= machine.maxPressure) {
        return null;
    }

    return {
        type: "PRESSURE",
        severity: "CRITICAL",
        title: "High Pressure",
        message: `${machine.machineCode} exceeded maximum pressure.`,
        value: reading.pressure,
        threshold: machine.maxPressure
    };
};

module.exports = evaluatePressureRule; 