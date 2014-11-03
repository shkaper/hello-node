/**
 * module to handle requests
 */

var querystring = require('querystring');
var formidable = require('formidable');
var ordermodel = require('./ordermodel').ordermodel;

function start(response) {
	console.log('Request handler \'start\' was called');
	
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<table border="0">'+
    '<tr>'+
    '<td><form action="/upload" enctype="multipart/form-data" method="post">'+
	    '<label>Item: </label>' + '<input type="itemName" name="itemName" id="itemcreate"></input><br>' +
	    '<label>Customer name: </label>' + '<input type="customer" name="customer" id="customercreate"></input><br>' +
	    '<input type="submit" value="Submit order" id="submitcreate" />'+
    '</form><td>'+
    '<td><form action="/list" enctype="multipart/form-data" method="post" id="read">'+
		'<label>Item: </label>' + '<input type="itemName" name="itemName"></input><br>' +
		'<label>Customer name: </label>' + '<input type="customer" name="customer"></input><br>' +
		'<input type="submit" value="Find order" />'+
	'</form><td>'+
    '</table>'+
    '</body>'+
    '</html>';
	
	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request) {
	console.log('Request handler \'upload\' was called');
	
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields) {
		console.log("Parsing done");

		var order = new ordermodel({
			itemName : fields.itemName,
			customer : fields.customer
		});
		
		order.save(function (err) {
			if (!err) {
				response.writeHead(200, {"Content-Type" : "text/plain"});
				response.write('Registered order:');
				response.write('\nItem: ' + order.itemName);
				response.write('\nCustomer: ' + order.customer);
				response.end();
			} else {
				console.log(err);
				response.statusCode = 500;
				response.send({error: 'Error'});
//            if(err.name == 'ValidationError') {
//                res.statusCode = 400;
//                res.send({ error: 'Validation error' });
//            } else {
//                res.statusCode = 500;
//                res.send({ error: 'Server error' });
//            }
//            log.error('Internal error(%d): %s',res.statusCode,err.message);
			}
		});
	  });
	  
}

function list(response, request) {
	console.log('Request handler \'list\' was called');
	
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields) {
		console.log("Parsing done");
		var query = ordermodel.findOne({'itemName': fields.itemName, 'customer' : fields.customer});
		  query.exec(function(err, result) {
		    if (!err && result !== null) {
		    	console.log('Fetched result from db: ', result);
				response.writeHead(200, {"Content-Type" : "text/plain"});
				response.write('Found order:');
				var resultObj = result.toObject();
				Object.keys(resultObj).forEach(function(key, index) {
					  response.write('\n');
					  response.write(key + ': ' + this[key]);
					}, resultObj);
				response.end();
		    } else if (result === null) {
		    	console.log('Error: Query result is null');
				response.statusCode = 404;
				response.end('Order was not found');
		    } else if (err) {
		    	console.log(err);
				response.statusCode = 500;
				response.end('Error: ' + err.message);
		    } else {
		    	console.log('Undefined error');
		    	response.statusCode = 500;
		    	response.end();
		    }
		  });
	  });
	
}

exports.start = start;
exports.upload = upload;
exports.list = list;