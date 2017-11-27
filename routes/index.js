var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Foril', message: "The fake news detector [API]" });
});

module.exports = router;
