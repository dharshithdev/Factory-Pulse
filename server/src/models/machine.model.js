const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
    {
        machineCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },

        maxTemperature: {
            type: Number,
            required: true,
            min: 0
        },

        maxPressure: {
            type: Number,
            required: true,
            min: 0
        },

        maxRPM: {
            type: Number,
            required: true,
            min: 0
        },

        maxPower: {
            type: Number,
            required: true,
            min: 0
        },

        maxProductionPerMinute: {
            type: Number,
            required: true,
            min: 0
        },

        currentMetrics: {
            temperature: {
                type: Number,
                default: 0
            },

            pressure: {
                type: Number,
                default: 0
            },

            rpm: {
                type: Number,
                default: 0
            },

            power: {
                type: Number,
                default: 0
            },

            productionCount: {
                type: Number,
                default: 0
            },

            timestamp: {
                type: Date,
                default: null
            }
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Machine", machineSchema);