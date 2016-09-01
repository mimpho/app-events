'use strict';

angular.
  module('eventsApp').
  config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state("catalog", {
          url: "/catalog",
          title: "Catalog",
          template: "<catalog></catalog>"/*,
          templateUrl: "/catalog/catalog.template.html",
          controller: "catalogCtrl",
          controllerAs: "vm",
          resolve: ['$stateParams', 'patientService', function ($stateParams,
                   patientService) {
              return patientService.resolve($stateParams.patientid);
          }]*/
        /*.state("catalog", {
          url: "/catalog/:patientid",
          title: "Patient",
          templateUrl: "/app/patient/patient.html",
          controller: "patient",
          controllerAs: "vm",
          resolve: ['$stateParams', 'patientService', function ($stateParams,
                   patientService) {
              return patientService.resolve($stateParams.patientid);
          }]*/
        });
      //$locationProvider.html5Mode(true);
      $urlRouterProvider.when('', '/catalog');
    }
  ]);