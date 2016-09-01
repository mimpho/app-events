/*
  TODOs
  Este ejemplo sencillo funciona: http://plnkr.co/edit/NpzQsxYGofswWQUBGthR?p=preview
  Mirar explicación: http://www.ng-newsletter.com/posts/angular-ui-router.html
*/
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
