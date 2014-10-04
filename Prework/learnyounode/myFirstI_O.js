var fs = require('fs');

var file = fs.readFileSync(process.argv[2]);

var file_buf = file.toString();
var array = file_buf.split('\n');

var count = array.length -1
console.log(count);