var express = require('express');
var router = express.Router();
var models = require('../models/index.js');
var Page = require('../models/index.js').Page;

/* GET home page. */
router.get('/', function(req, res) {
	Page.find(function(err, pages) {
		res.render('index', { 
  			title: 'BROWSE MY WIKISTACK',
  			pages: pages  
  		});
	})
  
});

router.get('/wiki/:title', function(req,res) {
	var URL = req.params.title;
	models.Page.find({'url_name': URL}, function(err, result) {
		res.render('page', {
			title: result.title,
			body: result.body
		});
	})
});

module.exports = router;
