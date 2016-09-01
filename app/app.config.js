'use strict';

angular.
  module('eventsApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      //$locationProvider.hashPrefix('!');

      $routeProvider.
        when('/catalog', {
          title: 'Catalog',
          template: '<events-catalog></events-catalog>'
        }).
        otherwise('/catalog');
    }
  ]);
