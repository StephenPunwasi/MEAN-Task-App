//load data model for API
var Todo = require('./models/todo');

//expose the routes to our app

module.exports = function(app){
  // api ============================================
  app.get('/api/todos', function(req, res){
      //use mongoose to get all todos in the database
      Todo.find(function(err, todos){
          if (err)
            res.send(err)
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
                res.send(err)
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
                res.send(err)
              res.json(todos);
          });
      });
  });

  //Single view application that will be handles in Angular.js
  app.get('*', function(req, res){
      res.sendfile('./public/index.html');
  });
};
