var fs = require('fs');
var http = require('http');
var bl = require('bl');

var url3 = process.argv[4];
var url2 = process.argv[3];
var url1 = process.argv[2];


var results3 = "";
var results2 = "";
var results1 = "";

http.get(url1, function(res) {
    res.setEncoding('utf8');
    res.pipe(bl(function(err, data) {
    	results1 += data.toString();
        http.get(url2, function(res) {
            res.setEncoding('utf8');
            res.pipe(bl(function(err, data) {
                results2 += data.toString();
                http.get(url3, function(res) {
	                res.setEncoding('utf8');
	                res.pipe(bl(function(err, data) {
	                    results3 += data.toString();
	                	console.log(results1);
	                	console.log(results2);
	                	console.log(results3);
	                }));
	                
            	});
            }));
        });
    }));
});

            ////Callback HELL
            // models.Hotel.find(function(err, hotelResults) {
            //   hotels = hotelResults;
            //    models.Restaurant.find(function(err, restaurantResults) {
            //  		restaurants=restaurantResults;
            // 	  	models.ThingsToDo.find(function(err, thingResults) {
            // 		  	things=thingResults;

            // res.render('index', { hotels: hotels,
            // title: "Trip Planner",
            // restaurants : restaurants,
            // things_to_do: things })	
            //   		})
            //  	})
            // });