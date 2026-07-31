const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
    {
        machine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Machine",
            required: true
        },

        sensorReading: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SensorReading",
            required: true
        },

        type: {
            type: String,
            required: true
        },

        severity: {
            type: String,
            enum: ["WARNING", "CRITICAL"],
            required: true
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        value: {
            type: Number,
            required: true
        },

        threshold: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["ACTIVE", "RESOLVED"],
            default: "ACTIVE"
        },

        isAcknowledged: {
            type: Boolean,
            default: false
        },

        triggeredAt: {
            type: Date,
            default: Date.now
        },

        lastSeenAt: {
            type: Date,
            default: Date.now
        },

        resolvedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Alert", alertSchema);