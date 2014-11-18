var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
//var store = require('../store');
var index = require('../models/index.js');
var Tweet = index.Tweet;
var User = index.User;

/* GET home page. */
router.get('/', function(req, res) {
	Tweet.findAll( {include: [User] }).success(function(tweetsFromDatabase) {
		res.render('index', {
			title: 'Twitter.js Awesome stuff',
			tweets: tweetsFromDatabase,
			show_form: true
		});
	})
});

/* GET home page. -Version 2 */
// router.get('/', function(req, res) {
// 	models.Tweet
// 		.findAll( {include: [User]});
// 		.done(function(err, tweets) {
// 			res.render('index', {
// 				title: 'Twitter.js Awesome stuff',
// 				tweets: tweets,
// 				show_form: true
// 			})
// 		});
// });

router.get('/users/:name', function(req, res) {
  	var param_name = req.params.name;

  	User.find({ where: {name: param_name} }).complete(function(err,user) {
  		user.getTweets().complete(function(err, tweets) {
  			res.render('index', {
		  		title: 'Twitter.js - Posts by '+ param_name,
		  		tweets: tweets,
		  		show_form: true,
		  		username: param_name
		  	})
  		})
  	});
  	
});

router.get('/users/:name/tweets/:id', function(req, res) {
	var param_name = req.params.name;
	var tweetId = Number(req.params.id);
	//var list = store.find({id: tweetId});
	User.find({ where: {name: param_name} }).complete(function(err,user) {
  		user.getTweets({ where: {id:tweetId }}).complete(function(err, tweets) {
			res.render('index', { 
				title: 'Twitters.js - A single tweet by '+ param_name, 
				tweets: tweets
			})
		})
	});
});

module.exports = router;
