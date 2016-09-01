'use strict';

angular.
  module('eventsApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/catalog', {
          template: '<events-catalog></events-catalog>'
        }).
        otherwise('/catalog');
    }
  ]);
