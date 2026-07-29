// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Security Middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FactoryPulse API is running"
    });
});

module.exports = app;