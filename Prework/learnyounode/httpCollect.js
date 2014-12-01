var fs = require('fs');
var http = require('http');
var bl = require('bl');

http.get(process.argv[2],function(res) {
	var str = "";
	var length = 0;
	res.setEncoding('utf8');
	res.pipe(bl(function(err, data) {
		length += data.length;
		data = data.toString();
		str += data;
		console.log(length);
		console.log(str);
		
	}))

})