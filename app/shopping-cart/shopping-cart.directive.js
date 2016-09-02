'use strict';

angular.
  module('shoppingCart').
  factory('mySharedService', function($rootScope) {
    var sharedService = {};
    sharedService.message = '';
    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };
    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };
    return sharedService;
  }).
  directive('shoppingCartComponent', function(mySharedService) {
    return {
      restrict: "E",
      templateUrl: 'shopping-cart/shopping-cart.template.html',
      controller: function($scope, $attrs, mySharedService) {
          $scope.$on('handleBroadcast', function() {
              $scope.message = 'Directive: ' + mySharedService.message;
          });
      },
      replace: true
    };
  });