const express = require('express');
const router = express.Router();
const duckfeedController = require('../controllers/duckfeedController');

router.post("", duckfeedController.duckfeedNotScheduled);

router.post("/scheduled", duckfeedController.createDuckfeed);

router.get("", duckfeedController.getDuckfeeds)

module.exports = router;
