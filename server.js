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

// define model =====================================
var Todo = mongoose.model('Todo', {
    text: String
});

// Express routes ===================================
  // api ============================================
  app.get('/api/todos', function(req, res){
      //use mongoose to get all todos in the database
      Todo.find(function(err, todos){
          if (err)
            res.send(err) //error catch
          res.json(todos); //return all todos in JSON
      });
  });

  //CREATE todo and send back all todos after
  app.post('/api/todos', function(req, res){

      //create a todo, information comes from AJAX request
      Todo.create({
          text: req.body.text,
          done: false
        }, function(err, todo){
          if (err)
            res.send(err);

          //get and return all the todos after you create another
          Todo.find(function(err, todos){
              if(err)
                res.send(err);
              res.json(todos);
          });
      });
  });

  // delete a todo
  app.delete('/api/todos/:todo_id', function(req, res){
      Todo.remove({
          _id: req.params.todo_id
        }, function(err, todo) {
          if (err)
            res.send(err);

          // get and return all the todos after you create another one
          Todo.find(function(err, todos){
              if (err)
                res.send(err);
              res.json(todos);
          });
      });
  });

// listen (start app with node server.js) ===========

app.listen(3000);
console.log("App listening on port 3000");
