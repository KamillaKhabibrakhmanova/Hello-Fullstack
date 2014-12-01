var net = require('net');
var server = net.createServer(function(socket) {
	var str = "";
	date = new Date();
	var month = date.getMonth() + 1;
	str += date.getFullYear() + "-" + month + "-" +
	date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + "\n";
	socket.write(str);
	socket.end();
});
server.listen(process.argv[2]);