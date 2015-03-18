var should = require('should'); 
var assert = require('assert');
var superagent = require ('superagent');
var mongoose = require('mongoose');
var TradeMessage = require('../schemas/tradeMessageSchema.js');

var db = 'mongodb://localhost/tradeMessagesTest'
var apiUrl = 'http://localhost:8000/tradeMessages';
var apiUrlPerCountry = 'http://localhost:8000/tradeMessages/percountry';
var tm1,tm2;


mongoose.connect(db, function(err) {
	    if(err) {
	        console.log('Test database connection error', err);
	    } else {
	        console.log('Test database connection successful');
	    }
});


describe('Trade Messages API', function() {

  	beforeEach(function(done) {
        tm1 =  new TradeMessage({
		    	userId: 1,
				currencyFrom: "test_EUR",
		  		currencyTo: "test_GPB",
		  		amountSell: 1000,
		  		amountBuy: 900,
		  		rate: 1.2,
		  		timePlaced : "11-MAR-15 10:27:44",
		  		originatingCountry:"test_FR"
		});
	  	tm1.save(function (err, tradeMessage, numberAffected) {
	  			if (err) throw err;	
	  			console.log("saved1");
		});

		tm2 = new TradeMessage({
		    	userId: 2,
				currencyFrom: "test_EUR",
		  		currencyTo: "test_GPB",
		  		amountSell: 2000,
		  		amountBuy: 1000,
		  		rate: 1.2,
		  		timePlaced : "11-MAR-15 10:27:44",
		  		originatingCountry:"test_IE"
		});
	  	tm2.save(function (err, tradeMessage, numberAffected) {
	  			if (err) throw err;	
	  			console.log("saved2");
		});

		done();
    });

    afterEach(function(done){
    	TradeMessage.remove({}, function (err) {
	  		if (err) return handleError(err);
	  		console.log("removed");
	  	});
	  	done();
    });


  	describe('When a user post a new Trade Message', function() {
	    it('The trade message should correctly be added', function(done) {
			var newTradeMessage = {
		    	userId: 11,
				currencyFrom: "test_EUR",
		  		currencyTo: "test_GPB",
		  		amountSell: 1000,
		  		amountBuy: 900,
		  		rate: 1.2,
		  		timePlaced : "11-MAR-15 10:27:44",
		  		originatingCountry:"test_PL"
		    };
		    superagent.post(apiUrl)
		    .set('Content-Type', 'application/json')
			.send(newTradeMessage)
			.end(function(err, res) {
		        if (err) { throw err; }

		        res.body.should.containEql({'userId': newTradeMessage.userId,
		        							'currencyFrom': newTradeMessage.currencyFrom,
		        							'currencyTo': newTradeMessage.currencyTo,
		        							'amountSell': newTradeMessage.amountSell,
		        							'amountBuy': newTradeMessage.amountBuy,
		        							'rate': newTradeMessage.rate, 
		        							'timePlaced': newTradeMessage.timePlaced,
		        							'originatingCountry': newTradeMessage.originatingCountry});
		         res.status.should.equal(200);
		         done();
		    });
	    });
	});
	
	describe('When a user get Trade Messages', function() {
	    it('should correctly see 2 tradeMessages', function(done){

		superagent
		    .get(apiUrl)
		    .end(function(err,res){
		      	res.status.should.equal(200);
		      	res.should.be.json;
		      	res.body.should.not.be.empty;

		      	res.body.data[0].should.have.property('userId', tm1.userId);
		      	res.body.data[0].should.have.property('currencyFrom',tm1.currencyFrom);
		      	res.body.data[0].should.have.property('currencyTo',tm1.currencyTo);
		      	res.body.data[0].should.have.property('amountSell',tm1.amountSell);
		      	res.body.data[0].should.have.property('amountBuy',tm1.amountBuy);
		      	res.body.data[0].should.have.property('rate',tm1.rate);
		      	res.body.data[0].should.have.property('originatingCountry', tm1.originatingCountry);

		      	res.body.data[1].should.have.property('userId', tm2.userId);
		      	res.body.data[1].should.have.property('currencyFrom',tm2.currencyFrom);
		      	res.body.data[1].should.have.property('currencyTo',tm2.currencyTo);
		      	res.body.data[1].should.have.property('amountSell',tm2.amountSell);
		      	res.body.data[1].should.have.property('amountBuy',tm2.amountBuy);
		      	res.body.data[1].should.have.property('rate',tm2.rate);
		      	res.body.data[1].should.have.property('originatingCountry', tm2.originatingCountry);

		      	done();
		    });
	  	});
	});

	describe('When a user get Trade Message by userId', function() {
		it('should return 404 error', function(done){

		superagent
		    .get(apiUrl+"/1")
		    .end(function(err,res){
		      	res.status.should.equal(404);
		      	res.body.should.be.empty;
		      
		      	done();
		    });
	  	});
	});

	describe('When a user get Trade Messages qty per country ', function() {
		it('Should correctly see 1 tm for IE and 1 tm for FR ', function(done){

		superagent
		    .get(apiUrlPerCountry)
		    .end(function(err,res){
		      	res.status.should.equal(200);
		      	res.body.should.not.be.empty;
		      	res.should.be.json;

				res.body.data.should.containEql({ '_id': 'test_IE', 'trade_messages_per_country': 1 });
		      	res.body.data.should.containEql({ '_id': 'test_FR', 'trade_messages_per_country': 1 });

		      	done();
		    });
	  	});
	});
});
