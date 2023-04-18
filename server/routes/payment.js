const express = require("express");
const router = express.Router();
const payment_controller = require("../controllers/payment_controller");

// handling razorpay payments:
router.post("/pay", payment_controller.checkout);
router.post("/paymentVerification", payment_controller.paymentVerification);

// get the user's order by ID:
router.get("/:id", payment_controller.getOrder);

module.exports = router;
