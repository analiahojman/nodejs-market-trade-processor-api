'use strict';
var mongoose = require('mongoose');

/*
 * Mongoose schema definition
 */ 
var TradeMessageSchema = new mongoose.Schema({
  userId: Number,
  currencyFrom: String,
  currencyTo: String,
  amountSell: Number,
  amountBuy: Number,
  rate: Number,
  timePlaced: Date,
  originatingCountry: String
	

});

// Convert the Schema into Model and export it.
module.exports = mongoose.model('TradeMessage', TradeMessageSchema);





