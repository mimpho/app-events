'use strict';

angular.
  module('eventsApp').
  config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state("catalog", {
          url: "/catalog",
          template: "<event-list></event-list>",
          data: {
            pageTitle: "Catalog"
          }
        })
        .state("sessions", {
          url: "/sessions",
          template: "<sessions></sessions>",
          data: {
            pageTitle: "Sessions"
          },
          params: {
            eventid: "eventid"
          }
        });
      /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });*/
      $urlRouterProvider.otherwise('/catalog');
    }
  ]);