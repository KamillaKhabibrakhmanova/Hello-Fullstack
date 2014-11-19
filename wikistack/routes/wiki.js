var express = require('express');
var router = express.Router();

var Page = require('../models').Page;

/* GET users listing. */
router.get('/:urlName', function(req, res) {
  Page
  	.findOne({ url_name: req.params.urlName})
  	.exec(function(err, page) {
  		res.render('show', page);
  		// {
  		// 	title: page.title,
  		// 	body: page.body
  		// });
  	});
});

module.exports = router;
