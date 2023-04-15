const express = require("express");
const router = express.Router();
const plan_controller = require("../controllers/plan_controller");

// Get your planned trip detail:
router.get("/", plan_controller.plan);

module.exports = router;
