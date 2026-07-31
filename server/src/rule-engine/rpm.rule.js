const evaluateRPMRule = (machine, reading) => {

    if (reading.rpm <= machine.maxRPM) {
        return null;
    }

    return {
        type: "RPM",
        severity: "WARNING",
        title: "High RPM",
        message: `${machine.machineCode} exceeded maximum RPM.`,
        value: reading.rpm,
        threshold: machine.maxRPM
    };
}    

module.exports = evaluateRPMRule;