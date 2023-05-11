const express = require("express");
const router = express.Router();
const order_controller = require("../controllers/order_controller");
const { verifyToken } = require("../config/JWT_auth");

// Add Order:
router.post("/", verifyToken, order_controller.add);

// Get All Order by ID:
router.get("/:id", verifyToken, order_controller.getOrder);

module.exports = router;
