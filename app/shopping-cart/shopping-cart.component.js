'use strict';

// Register `shoppingCart` component, along with its associated controller and template
angular.
  module('shoppingCart').
  component('shoppingCart', {
    templateUrl: 'shopping-cart/shopping-cart.template.html',
    controller: ['$scope', 'ShoppingCartService', function ShoppingCartController($scope, ShoppingCartService) {
    	this.getCart = function() {
    		return ShoppingCartService.getCart();
    	}
    	this.cart = this.getCart();
    }]
  });