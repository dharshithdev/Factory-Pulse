const express = require("express");
const analyticsController = require("../controllers/analytics.controller");

const router = express.Router();

router.get(
    "/overview",
    analyticsController.getOverview
);

router.get(
    "/production",
    analyticsController.getProductionTrend
);

module.exports = router;