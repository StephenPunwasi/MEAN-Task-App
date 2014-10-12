// requirements for app =============================
var express = require('express');
var app = express(); // Create app with express
var mongoose = require('mongoose'); //Connect to mongodb app
var morgan = require('morgan'); //log requests to console
var methodOverride = require('method-override'); //simulate DELETE and PUT
var bodyParser = require('body-parser'); // Pull information from HTML POST
var database = require('./config/database'); //storing mongo credentials
var port = process.env.PORT || 3000;

// database configuration ===========================
mongoose.connect(database.url); //connect to mongoDB server


app.use(express.static(__dirname + '/public')); //set static file server
app.use(morgan('dev')); //log requests
app.use(bodyParser.urlencoded({'extended':'true'})); //parse application/form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'})); //parse application/json
app.use(methodOverride());


// Routes
require('./app/routes.js')(app);

// listen (start app with node server.js) ===========

app.listen(port);
console.log("App listening on port " + port);
