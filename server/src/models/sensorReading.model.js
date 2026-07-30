const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema(
    {
        machine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Machine",
            required: true
        },

        temperature: {
            type: Number,
            required: true
        },

        pressure: {
            type: Number,
            required: true
        },

        rpm: {
            type: Number,
            required: true
        },

        power: {
            type: Number,
            required: true
        },

        productionCount: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["Running", "Idle", "Stopped", "Maintenance"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("SensorReading", sensorReadingSchema);