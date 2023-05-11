const express = require("express");
const router = express.Router();
const { verifyToken } = require("../config/JWT_auth");
const host_controller = require("../controllers/host_controller");

// Register/Create host:
router.post("/addHotel", verifyToken, host_controller.addHotel);

// get Hotel details -> based upon the ID:
router.get("/getHotel/:id", host_controller.getHotel);

// update Hotel -> based upon the ID:
router.post("/updateHotel/:id", verifyToken, host_controller.updateHotel);

module.exports = router;
