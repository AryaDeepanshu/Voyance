const express = require("express");
const router = express.Router();
const payment_controller = require("../controllers/payment_controller");

// handling razorpay payments:
router.post("/pay", payment_controller.checkout);
router.post("/paymentVerification", payment_controller.paymentVerification);

module.exports = router;
