const express = require("express");
const  SearchHotel  = require("../controllers/search_controller");
const router = express.Router();


// for any route, we define the mapping here:
// router.use('/routerName', require('./routerFileName'));

router.route("/").get(SearchHotel);

module.exports = router;
