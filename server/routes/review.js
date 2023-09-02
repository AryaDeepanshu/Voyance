const express = require("express");
const router = express.Router();
const { verifyToken } = require("../config/JWT_auth");
const review_controller = require("../controllers/review_controller");

// get review by id:
router.get("/:id", review_controller.getReviewById);

// add review:
router.post("/add", verifyToken, review_controller.addReview);

// udpate / modify review:
router.post("/update", verifyToken, review_controller.updateReview);

// delete review:
router.post("/delete", verifyToken, review_controller.deleteReview);

module.exports = router;
