const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../config/JWT_auth");
const host_controller = require("../controllers/host_controller");

// Register/Create host:
router.post("/addHotel", host_controller.addHotel);

// get Hotel details -> based upon the ID:
router.get("/getHotel/:id", host_controller.getHotel);

// update Hotel -> based upon the ID:
router.post("/updateHotel/:id", host_controller.updateHotel);

module.exports = router;
