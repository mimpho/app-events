'use strict';

angular.
  module('shoppingCart').
  controller('shoppingCartController', ['$scope', function($scope) {
    var self = this;
    console.log("controller");
    console.log($scope);
    $scope.customer = {
      name: 'Naomi',
      address: '1600 Amphitheatre'
    };
    //self.locations1 = new Array(self.event.sessions.length);
    $scope.locations1 = new Array(4);

    $scope.pushLocation1 = function pushLocation1(index) {
console.log("pushLocation1");
      if ($scope.locations1[index] < self.event.sessions[index].availability)
        $scope.locations1[index]++;
    };
    $scope.popLocation1 = function popLocation1(index) {
console.log("popLocation1");
      if ($scope.locations1[index] > 0)
        $scope.locations1[index]--;
    };
  }]).
  directive("shoppingCart", function() {
    var linkFunction = function(scope, element, attributes) {
      scope.text = scope.fn({ count: 5 });
      console.log(attributes);
      console.log(scope.text);
      console.log(scope.locations);
    };

    return {
      restrict: "E",
      //template: "<p></p>",
      templateUrl: 'shopping-cart/shopping-cart.template.html',
      link: linkFunction,
      scope: {
        fn: "&fn",
        locations: "&locations" 
      }
    };
  });