/*
  TODOs
  Este ejemplo sencillo funciona: http://plnkr.co/edit/NpzQsxYGofswWQUBGthR?p=preview
  Mirar explicación: http://www.ng-newsletter.com/posts/angular-ui-router.html
*/
'use strict';

angular.
  module('eventsApp').
  config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state("catalog", {
          url: "/catalog",
          title: "Catalog",
          template: "<events-catalog></events-catalog>",
          //templateUrl: "/events-catalog/events-catalog.template.html",
          // controller: "catalogCtrl",
          // controllerAs: "vm",
          // resolve: ['$stateParams', 'patientService', function ($stateParams,
          //          patientService) {
          //     return patientService.resolve($stateParams.patientid);
          // }]
        })
        .state("test", {
          url: "/test/:patientid",
          title: "Patient",
          templateUrl: "/app/patient/patient.html",
          controller: "patient",
          controllerAs: "vm",
          resolve: ['$stateParams', 'patientService', function ($stateParams,
                   patientService) {
              return patientService.resolve($stateParams.patientid);
          }]
        });
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
      $urlRouterProvider.
        when('', '/catalog').
        otherwise('/catalog');
    }
  ]);