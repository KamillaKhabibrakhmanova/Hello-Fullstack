var fs = require('fs');
var path = require('path');

module.exports = function(directory, ext, callback) {
	fs.readdir(directory, function(err, list) {
		if (err) return callback(err, null);
		result = [];
		list.forEach(function(file) {
			if (path.extname(file) === "." + ext) {
				result.push(file);
			}
		});
		callback(null, result);
	});
};
