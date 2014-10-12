angular.module('todoController', [])
  .controller('mainController', function($scope, $http){
      $scope.formData = {};

      // retreive all todos when the page loads
      $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data;
        })
        .error(function(data){
          console.log('Error: ' + data);
        });
      // on submission of the add form, send the text to NODE
      $scope.createTodo = function(){
        $http.post('/api/todos', $scope.formData)
          .success(function(data){
              $scope.formData = {}; // clean form so user can enter new item
              $scope.todos = data;
          })
          .error(function(data){
            console.log('Error: ' + data);
          });
      };

      // delete item after checked
      $scope.deleteTodo = function(id){
        $http.delete('/api/todos/' + id)
          .success(function(data){
              $scope.todos = data;
          })
          .error(function(data){
            console.log('Error: ' + data);
          });
      };
  });
