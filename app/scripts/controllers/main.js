'use strict';

/**
 * @ngdoc function
 * @name offrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the offrApp
 */
angular.module('offrApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
