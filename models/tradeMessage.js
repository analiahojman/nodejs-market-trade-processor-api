'use strict';

var TradeMessage = require('../schemas/tradeMessageSchema.js');

/**
 * Save the trade message to database
 * @param tradeMessage
 * @param {Function} callback
 */
exports.save = function (tradeMessage, callback){
  TradeMessage.create(tradeMessage, function (err, tradeMessage) {
    if (err) return callback(err, null);
    callback(null, tradeMessage);    
  });
};

/**
 *  Get trade messages
 *  @param {Function} callback 
 */
exports.get = function(callback) {
  TradeMessage.find(function (err, tradeMessages) {
    if (err) return callback(err, null);
    callback(null, tradeMessages);  
  });
};

/**
 *  Get trade messages qty group by country 
 *  @param {Function} callback 
 */
exports.getTradeMsgQtyGroupByCountry = function(callback){
  TradeMessage.aggregate(
    { $group: 
      { _id: '$originatingCountry', trade_messages_per_country: { $sum: 1 } } 
    },
    function (err, res) {
      if (err) return callback(err, null);
      callback(null,res)
    }
  );
};









