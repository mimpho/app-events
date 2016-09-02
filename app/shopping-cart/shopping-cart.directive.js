'use strict';

angular.
  module('shoppingCart').
  directive("shoppingCartDirective", function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
          event: '=',
          locations: '=',
          sessions: '=',
          rem: "&"
      },
      templateUrl: 'shopping-cart/shopping-cart.template.html',
      controller: function($scope, $element, $attrs) {
        // Controles desde el shopping-cart
        $scope.removeEvent = function(index, locations) {
          locations[index] = 0;
          $scope.rem(index);
        };
      }
    };
  }).
  controller('shoppingCartController', ['$scope', function($scope) {
    // Controles desde el listado
    var self = this;
    $scope.event = null;
    $scope.locations = [];
    $scope.locationsA = [];
    $scope.sessionsA = [];

    $scope.removeA = function(index) {
      // TODO: Falta obtener index para poner a 0 el location
      console.log('remove ' + index);
    };

    $scope.pushLocation = function pushLocation(index,event,session) {
      if ($scope.locations[index] < session.availability) {
        $scope.locations[index]++;
        $scope.eventA = event;
        $scope.locationsA[index] = $scope.locations[index];
        $scope.sessionsA[index] = session;
      }
    };

    $scope.popLocation = function popLocation(index) {
      if ($scope.locations[index] > 0) {
        $scope.locations[index]--;
        $scope.locationsA[index] = $scope.locations[index];
      }
    };

  }]);