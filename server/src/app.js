// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandler");

const machineRoutes = require("./routes/machine.route");
const sensorReadingRoutes = require("./routes/sensorReading.route");
const alertRoutes = require("./routes/alert.route");
const dashboardRoutes = require("./routes/dashboard.route");
const analyticsRoutes = require("./routes/analytics.route");

const app = express();

// Security Middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/machines", machineRoutes);
app.use("/api/v1/sensor-readings", sensorReadingRoutes);
app.use("/api/v1/alerts", alertRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

app.use(errorHandler);

module.exports = app;