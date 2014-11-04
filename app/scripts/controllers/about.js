'use strict';

/**
 * @ngdoc function
 * @name offrApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the offrApp
 */
angular.module('offrApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
