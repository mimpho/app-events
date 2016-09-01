'use strict';

angular.
  module('eventsApp').
  config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state("catalog", {
          url: "/catalog",
          //template: "<events-catalog></events-catalog>",
          templateUrl: "/events-catalog/events-catalog.template.html",
          data: {
            pageTitle: "Catalog"
          }
        })
        /*.state("test", {
          url: "/test/:patientid",
          title: "Patient",
          templateUrl: "/app/patient/patient.html",
          data: {
            pageTitle: "Patient"
          },
          controller: "patient",
          controllerAs: "vm",
          resolve: ['$stateParams', 'patientService', function ($stateParams,
                   patientService) {
              return patientService.resolve($stateParams.patientid);
          }]
        })*/;
      /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });*/
      $urlRouterProvider.otherwise('/catalog');
    }
  ]);