angular.module('todoController', [])
  .controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos){
      $scope.formData = {};
      $scope.loading = true;

      // GET all todos when landing on the homepage
      Todos.get()
        .success(function(data){
            $scope.todos = data;
            $scope.loading = false;
        });

      // CREATE
      $scope.createTodo = function() {
        $scope.loading = true;

        if ($scope.formData.text != undefined){
          Todos.create($scope.formData)
            .success(function(data){
              $scope.loading = false;
              $scope.formData = {}; //clear the form so the user can enter again
              $scope.todos = data; //assign out new list of todos
            });
        }
      };

      // DELETE
      $scope.deleteTodo = function(id){
        $scope.loading = true;
        Todos.delete(id)
          // if successful creation, call our functionto get all new todos
          .success(function(data){
            $scope.loading = false;
            $scope.todos = data; //assign our new list of todos
          });
      };
  }]);
