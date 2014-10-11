// requirements for app =============================

var express = require('express');
var app = express(); // Create app with express
var mongoose = require('mongoose'); //Connect to mongodb app
var morgan = require('morgan'); //log requests to console
var methodOverride = require('method-override'); //simulate DELETE and PUT
var bodyParser = require('body-parser'); // Pull information from HTML POST
var mongodbadd = require('./mongoservercredentials.js'); //storing mongo credentials

// configuration ====================================

mongoose.connect(mongodbadd.mondgocred); //connect to mongoDB server

app.use(express.static(__dirname + '/public')); //set static file server
app.use(morgan('dev')); //log requests
app.use(bodyParser.urlencoded({'extended':'true'})); //parse application/form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'})); //parse application/json
app.use(methodOverride());

// listen (start app with node server.js) ===========

app.listen(3000);
console.log("App listening on port 3000");
