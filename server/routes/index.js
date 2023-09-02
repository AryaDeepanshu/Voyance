const express = require("express");
const router = express.Router();

// for any route, we define the mapping here:
// router.use('/routerName', require('./routerFileName'));

// handling authentication:
router.use("/auth", require("./auth"));

// handling user feature:
router.use("/user", require("./user"));

// handling host feature:
router.use("/host", require("./host"));

// handling hotel fetching and searching:
router.use("/hotel", require("./hotel"));

// handling rating and review mechanism:
router.use("/review", require("./review"));

// handling Chat-GPT functionality:
router.use("/plan", require("./plan"));

// handling order:
router.use("/order", require("./order"));

// handling payment:
router.use("/payment", require("./payment"));

module.exports = router;
