'use strict';

// Register `sessions` component, along with its associated controller and template
angular.
	module('sessions').
	component('sessions', {
		templateUrl: 'sessions/sessions.template.html',
		controller: ['$scope', '$http', '$state', 'ShoppingCartService', function SessionsController($scope, $http, $state, ShoppingCartService) {
			var self = this;
			
			self.orderProp = '-sessions.date';

			$http.
				get('assets/data/event-info-'+$state.params.eventid+'.json').
				then(function successCallback(response) {
					self.event = response.data;
					ShoppingCartService.init(self.event);
				}, function errorCallback(response) {
					self.event = null;
				});
			
			$(document).foundation();

			$scope.$on('LOCATION_UPDATED', function(e, data) {
				if (typeof self.locations != 'undefined')
					self.locations[data] = 0;
			});

			$scope.pushLocation = function (sessionid) {
				self.locations[sessionid] = angular.copy(ShoppingCartService.pushLocation(sessionid));
			}

			$scope.popLocation = function (sessionid) {
				self.locations[sessionid] = angular.copy(ShoppingCartService.popLocation(sessionid));
			}

		}]
	});