var angularTodo = angular.module('angularTodo', []);

function mainController($scope, $http){
  $scope.formData = {};

  // when landing on the page, get all todos and show them
  $http.get('/api/todos')
    .success(function(data){
        $scope.todos = data;
        console.log(data);
    })
    .error(function(data){
        console.log('Error: ' + data);
    });

  // when submitting the add form, POST to API
  $scope.createTodo = function(){
    $http.post('/api/todos', $scope.formData)
      .success(function(data){
          $scope.formData = {}; //clear the form for entry
          $scope.todos = data;
          console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

  //delete a todo after checking it
  $scope.deleteTodo = function(id){
    $http.delete('/api/todos/' + id)
      .success(function(data){
          $scope.todos = data;
          console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };
}
