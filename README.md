##Node.js Trade Message Processor - API/Publisher Server

This repo contains the source code of the Trade Message Processor API/Publisher Server.
Author: Analia Hojman

##Tech Stack:
+ Node.js
+ Express
+ Mongodb (mongoose)
+ Socket.io
+ Faye
+ Mocha
+ Superagent


##API spec:

```
+ GET: /tradeMessages/percountry
```
```
Response:
{
  "error": null,
  "errorMessage": null,
  "data": [
    {
      "_id": "country1",
      "trade_messages_per_country": 5000
    },
    {
      "_id": "Country2",
      "trade_messages_per_country": 1000
    }
  ]
}
```

```
+ GET: /tradeMessages/
```
```
Response:
{
  "error": null,
  "errorMessage": null,
  "data": [
    {"userId": 11,"currencyFrom": "EUR","currencyTo": "GPB","amountSell": 1233,"amountBuy": 900,"rate": 1.4,"timePlaced" : "14JAN-15 10:27:44","originatingCountry":"Country1"} ,
    {"userId": 11,"currencyFrom": "EUR","currencyTo": "GPB","amountSell": 1233,"amountBuy": 900,"rate": 1.4,"timePlaced" : "14JAN-15 10:27:44","originatingCountry":"Country2"} 
  ]
}
```

```
+ POST: /tradeMessages
```
```
Body request:
 {"userId": 11,"currencyFrom": "EUR","currencyTo": "GPB","amountSell": 1233,"amountBuy": 900,"rate": 1.4,"timePlaced" : "14JAN-15 10:27:44","originatingCountry":"Country1"} 
 Response: 200 OK / 503 err
```

Be sure to clone the [nodejs-market-trade-processor-webApp](https://github.com/analiahojman/nodejs-market-trade-processor-web-app) and run it also.

##Getting started:

To run this server, you will need:

1. [Node.js](http://nodejs.org) installed

2. [Mongodb](http://www.mongodb.org) installed and running on localhost

Then:

```
$ git clone https://github.com/analiahojman/nodejs-market-trade-processor-api.git
$ cd nodejs-trade-message-processor-api
$ npm install
$ node app.js
```

To run the tests:

NODE_ENV=test mocha



