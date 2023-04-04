const express = require("express");
const router = express.Router();
const { verifyToken } = require("../config/JWT_auth");
const review_controller = require("../controllers/review_controller");

router.get("/:id", review_controller.getReviewById);

router.post("/add", verifyToken, review_controller.addReview);

module.exports = router;
