'use strict';

/**
 * @ngdoc service
 * @name offrApp.User
 * @description
 * # User
 * Factory in the offrApp.
 */
angular.module('offrApp')
.factory('User', ['$resource',
  function($resource){
    return $resource('users/:userId.json', {}, {
      query: {method:'GET', params:{userId:'users'}, isArray:true}
    });
  }]);
