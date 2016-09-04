'use strict';

// Register `sessions` component, along with its associated controller and template
angular.
  module('sessions').
  component('sessions', {
    templateUrl: 'sessions/sessions.template.html',
    controller: ['$scope', '$http', '$state', 'ShoppingCartService', function SessionsController($scope, $http, $state, ShoppingCartService) {
      var self = this;
      self.orderProp = '-sessions.date';

console.log("component sessions");
      $http.
        get('assets/data/event-info-'+$state.params.eventid+'.json').
        then(function successCallback(response) {
          self.event = response.data;
        }, function errorCallback(response) {
          self.event = null;
        });
      
      $(document).foundation();

      //$scope.sessions = ShoppingCartService.listSessions(eventid);

      $scope.saveSession = function () {
          ShoppingCartService.saveSession($scope.newsession);
          $scope.newsession = {};
      }

      $scope.deleteSession = function (id) {
          ShoppingCartService.deleteSession(id);
          if ($scope.newsession.id == id) $scope.newsession = {};
      }

      $scope.pushLocation = function (eventid,sessionid) {
          $scope.locations[sessionid] = ShoppingCartService.pushLocation(eventid,sessionid);
      }
/*
      $scope.edit = function (id) {
          $scope.newsession = angular.copy(ShoppingCartService.get(id));
      }
*/    
    }]
  });