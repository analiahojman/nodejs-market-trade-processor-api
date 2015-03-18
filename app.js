'use strict';

var express = require('express'),
    path = require('path'),
    http = require('http'),
    faye = require('faye');
;

var port = process.env.PORT || 8000;
var tradeMessage = require('./controllers/tradeMessageController');
var mongoose = require('mongoose');

/**
 * Faye adapter for pub/sub
 */
var bayeux = new faye.NodeAdapter({
  mount:    '/faye',
  timeout:  45
});

var app = express();
var db = 'mongodb://localhost/tradeMessages';  //default is dev

/**
 * Database config based on the environment
 */
if ('development' == app.get('env')) {
    app.set('db', 'mongodb://localhost/tradeMessages');
}
if ('test' == app.get('env')) {
      app.set('db', 'mongodb://localhost/tradeMessagesTest');
}

/**
 * Mongo Database connection
 */ 
mongoose.connect(app.get('db'), function(err) {

    if(err) {
        console.log('database connection error', err);
    } else {
        console.log('database connection successful' + app.get('db'));
    }
});

/**
 * Server config
 */
var server = http.createServer(app);
bayeux.attach(server);

server.listen(port, function () {
    console.log("Express server listening on port " + port);
});

/**
 *  To parse json data from incoming requests
 */
app.use(express.json());

/**
 *  Accept POST requests and then publish trade messages qty per country.
 */
app.post('/tradeMessages', tradeMessage.save, function(err, data) {
		tradeMessage.findTradeMessagesPerCountry(function(err,tradeMessages){
		bayeux.getClient().publish('/tradeMessage', {text: tradeMessages});
	});
});

/**
 *	Get all the tradeMessages
 */
app.get('/tradeMessages', tradeMessage.get);

/**
 *	Get tradeMessages quantity group by country
 */
app.get('/tradeMessages/percountry', tradeMessage.getTradeMessagesPerCountry);

/**
 *  All the requests to '/' are redirected to '/tradeMessages'
 */
app.get('/', function(req,res){
	res.redirect(301,'/tradeMessages');
});


