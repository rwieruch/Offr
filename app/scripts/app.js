'use strict';

/**
 * @ngdoc overview
 * @name offrApp
 * @description
 * # offrApp
 *
 * Main module of the application.
 */
angular
  .module('offrApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
