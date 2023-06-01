var express = require('express');
var router = express.Router();

// GET /reviews
router.get('/', function(req, res, next) {
    res.status(200).send('GET /reviews');
});

module.exports = router;
