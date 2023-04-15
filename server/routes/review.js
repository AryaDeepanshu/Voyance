const express = require("express");
const router = express.Router();
const { verifyToken } = require("../config/JWT_auth");
const review_controller = require("../controllers/review_controller");

router.get("/:id", review_controller.getReviewById);

router.post("/add", verifyToken, review_controller.addReview);

router.post("/update", verifyToken, review_controller.updateReview);

router.post("/delete", verifyToken, review_controller.deleteReview);

module.exports = router;
