//load mongoose to interact with Mongo
angular.module('todoService',[])
  // Simple service
  .factory('Todos', ['$http', function($http){
      return {
        get: function() {
          return $http.get('/api/todos');
        },
        create : function(todoData){
          return $http.post('/api/todos', todoData);
        },
        delete : function(id){
          return $http.delete('/api/todos/' + id);
        }
      };
  }]);
