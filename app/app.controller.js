'use strict';

angular.
  module('eventsApp').
  controller('eventsCtrl', ['$scope', '$state',
    function MyCtrl($scope, $state) {

      $scope.catalog = function() {
        $state.go('catalog');
      };

      $scope.about = function() {
        $state.go('about');
      };

      $scope.credits = function() {
        $state.go('credits');
      };
    }
  ]);