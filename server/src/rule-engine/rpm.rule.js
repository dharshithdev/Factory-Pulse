const evaluateRPMRule = (machine, reading) => {

    if (reading.rpm >= machine.maxRPM) {
        return null;
    }

    return {
        type: "RPM",
        severity: "WARNING",
        title: "Low RPM",
        message: `${machine.machineCode} RPM dropped below expected value.`,
        value: reading.rpm,
        threshold: machine.maxRPM
    };
};

module.exports = evaluateRPMRule;