/**
 * HTTP server module
 */

var http = require('http');
var url = require('url');
var ip = '127.0.0.1';
//var ip = '192.168.2.102';
var port = '1337';

function start(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received');
		route(handle, pathname, response, request);
	}
	
	http.createServer(onRequest).listen(port, ip);
	console.log('Server running at http://' + ip + ':' + port);
}

exports.start = start;