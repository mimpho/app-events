'use strict';

// Register `shoppingCart` component, along with its associated controller and template
angular.
	module('shoppingCart').
	component('shoppingCart', {
		templateUrl: 'shopping-cart/shopping-cart.template.html',
		controller: ['$scope', 'ShoppingCartService', function ShoppingCartController($scope, ShoppingCartService) {

			this.cart = ShoppingCartService.getCart();
			$scope.removeSession = function(ievent,isession) {
				angular.copy(ShoppingCartService.removeSession(ievent,isession));
				$scope.$emit('LOCATION_UPDATED', isession);
			}
		}]
	 });