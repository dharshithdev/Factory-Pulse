const express = require("express");
const analyticsController = require("../controllers/analytics.controller");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");

router.use(protect);
router.get("/overview", analyticsController.getOverview);
router.get("/production", analyticsController.getProductionTrend);
router.get("/temperature", analyticsController.getTemperatureTrend);
router.get("/alerts", analyticsController.getAlertAnalytics);
router.get("/utilization", analyticsController.getMachineUtilization);
router.get("/export", analyticsController.exportAnalytics);

module.exports = router;