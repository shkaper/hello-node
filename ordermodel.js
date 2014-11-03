/**
 * module to work with mongoDB
 */

var mongoose    = require('mongoose');
//var log         = require('./log')(module);

mongoose.connect('mongodb://localhost/test1');
var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Connection error: ', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB");
});

var Schema = mongoose.Schema;

var orderSchema = new Schema({
	  itemName: String,
	  customer: String
//	  company: String,
//	  address: String,
////	  comments: [{ body: String, date: Date }],
//	  dateRegistered: { type: Date, 'default': Date.now },
//	  dateDelivered: Date,
	});

var ordermodel = mongoose.model('ordermodel', orderSchema);

exports.ordermodel = ordermodel;