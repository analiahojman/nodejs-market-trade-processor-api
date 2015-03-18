'use strict';

var _ = require('underscore');
var model = require('../models/tradeMessage');


/**
 * Send trade message to model to be saved
 */
exports.save = function(req, res, next){
  var tradeMessageBody = _.clone(req.body);
  model.save(tradeMessageBody, function(err, data){
    if (err) return res.send(503, err);
    res.send(200, req.body);
    next();
  });
};

/**
 *  Get trade messages
 */
exports.get = function(req, res, next) {
  model.get(function(err, data){
    res.json(err ? 503 : 200, {
      error: err ? true : null,
      errorMessage: err ? err : null,
      data: data
    });
  });
};

/**
 *  Get trade messages qty group by country 
 */
exports.getTradeMessagesPerCountry = function(req,res,next){
  model.getTradeMsgQtyGroupByCountry( function(err, data){
      res.json(err ? 503 : 200, {
          error: err ? true : null,
          errorMessage: err ? err : null,
          data: data
      });
  });  
};

/**
 *  Returns trade messages qty group by country 
 */
exports.findTradeMessagesPerCountry = function (callback){
  model.getTradeMsgQtyGroupByCountry( function(err, data){ 
    if (err) return callback(err, null);
    callback(null,data);
  }); 
};

