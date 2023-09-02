const express = require("express");
const router = express.Router();
const { verifyToken } = require("../config/JWT_auth");
const auth_controller = require("../controllers/auth_controller");

// Register / Create user:
router.post("/register", auth_controller.register);

// Login user:
router.post("/login", auth_controller.login);

// Google Login / register:
router.post("/google", auth_controller.google);

// Logout:
router.post("/logout", verifyToken, auth_controller.logout);

module.exports = router;
