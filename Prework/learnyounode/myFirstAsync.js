var fs = require('fs');

fs.readFile(process.argv[2], function(err, data) {
	var file_buf = data.toString();
	var array = file_buf.split('\n');
	var count = array.length -1
	console.log(count);
});