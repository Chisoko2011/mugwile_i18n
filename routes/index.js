var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  // rending the view! 
  res.render('index');
});

module.exports = router;
