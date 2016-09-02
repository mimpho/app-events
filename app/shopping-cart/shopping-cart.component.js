'use strict';

// Register `shoppingCart` component, along with its associated controller and template
angular.
  module('shoppingCart').
  component('shoppingCart', {
    templateUrl: 'shopping-cart/shopping-cart.template.html',
    controller: ['$scope', '$state', function ShoppingCartController($scope, $state) {
      var self = this;
      console.log($state);
    }]
  });