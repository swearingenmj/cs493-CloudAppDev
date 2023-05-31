var express = require('express');
var router = express.Router();

// GET /users/:userId/reviews
router.get('/:userId/reviews', function(req, res, next) {
    res.status(200).send('GET /users/:userId/reviews');
});

module.exports = router;
