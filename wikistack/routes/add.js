var express = require('express');
var router = express.Router();

var Page = require('../models').Page;

router.get('/', function(req, res) {
	res.render('add_page', {
		title: "ADD A PAGE"
	});
});

// put the submitted fields into the database where we can access it
//specifically....into Pages
router.post('/submit', function(req, res) {

	// Page.create({}, function(err, page) {
	// 	console.log(page);
	// 	res.redirect('/');
	// });

	var newPage = new Page(req.body);
	newPage.url_name = newPage.title.replace(/\W/g,'_');
	newPage.save(function(err, page) {
		res.redirect('/');
	});

	// var models = require('../models/');
	// var title = req.body.title;
	// var body = req.body.body;
	// var url_name = title.replace("\'", " ").split(" ").join("_");
	// //submit route
	// var p = new models.Page({ 
	// 	"title": title, 
	// 	"body": body, 
	// 	"url_name": url_name});
	// p.save();
	
});

//router.get
module.exports = router;
