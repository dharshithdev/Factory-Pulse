const config = require("./simulator.config");

const randomBetween = (min, max) => {
    return Math.random() * (max - min) + min;
};

const pickMachineStatus = () => {
    const random = Math.random() * 100;

    if (random < config.STATUS_PROBABILITY.RUNNING)
        return config.STATUS.RUNNING;

    if (random < config.STATUS_PROBABILITY.RUNNING + config.STATUS_PROBABILITY.IDLE)
        return config.STATUS.IDLE;

    if (random < config.STATUS_PROBABILITY.RUNNING + config.STATUS_PROBABILITY.IDLE + 
        config.STATUS_PROBABILITY.STOPPED)
        return config.STATUS.STOPPED;

    return config.STATUS.MAINTENANCE;
};

const generateSensorData = (machine) => {

    const current = machine.currentMetrics;

    const status = pickMachineStatus();

    let temperature;
    let pressure;
    let rpm;
    let power;
    let productionCount = current.productionCount;

    switch (status) {

        case config.STATUS.RUNNING:

            temperature =
                current.temperature === 0
                    ? randomBetween(60, 70)
                    : current.temperature +
                      randomBetween(-config.VARIATION.TEMPERATURE, config.VARIATION.TEMPERATURE);

            pressure =
                current.pressure === 0
                    ? randomBetween(28, 35)
                    : current.pressure +
                      randomBetween(-config.VARIATION.PRESSURE, config.VARIATION.PRESSURE);

            rpm =
                current.rpm === 0
                    ? randomBetween(1400, 1500)
                    : current.rpm +
                      randomBetween(-config.VARIATION.RPM, config.VARIATION.RPM);

            power =
                current.power === 0
                    ? randomBetween(4.5, 6)
                    : current.power +
                      randomBetween(-config.VARIATION.POWER, config.VARIATION.POWER);

            productionCount += Math.floor(randomBetween(1, config.VARIATION.PRODUCTION));

            break;

        case config.STATUS.IDLE:
            temperature = Math.max(current.temperature - 1, 35);
            pressure = 0;
            rpm = 0;
            power = 0.8;
            break;

        case config.STATUS.STOPPED:
            temperature = Math.max(current.temperature - 2, 30);
            pressure = 0;
            rpm = 0;
            power = 0;
            break;

        case config.STATUS.MAINTENANCE:

            temperature = 28;
            pressure = 0;
            rpm = 0;
            power = 0;
            break;
    }

    return {
        machine: machine._id,
        temperature: Number(temperature.toFixed(2)),
        pressure: Number(pressure.toFixed(2)),
        rpm: Math.round(rpm),
        power: Number(power.toFixed(2)),
        productionCount,
        status
    };
};

module.exports = generateSensorData;