var fs = require('fs');
var path = require('path');

var file = process.argv[2];
var ext = process.argv[3];

fs.readdir(file, function(err, files) {
	var list = "";
	for (var i = 0;i < files.length; i++) {
		if (path.extname(files[i]) === ("." + ext)) {

			list += files[i] + "\n";
		}
	}
	console.log(list);
});