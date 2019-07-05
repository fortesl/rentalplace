var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let model = {
    title: 'lmlf',
    message: process.env.ENVIRONMENT_LABEL || "this is development"
  }
  res.render('index', { model: model });
});

module.exports = router;
