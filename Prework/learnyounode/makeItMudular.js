var fs = require('fs');
var path = require('path');
var filter = require("./module.js");

filter(process.argv[2], process.argv[3], function(err, files) {
	if (err) return err.message;
	for (var i = 0; i < files.length; i++) {
		console.log(files[i]);
	}
})