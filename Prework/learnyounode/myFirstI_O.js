var fs = require('fs');

var file = fs.readFile(process.argv[2], function(err, data) {
	var file_buf = file.toString();
	var array = file_buf.split('\n');
	var count = array.length -1
	res.send(console.log(count));
});