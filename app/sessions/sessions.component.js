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
					self.locations = new Array(self.event.sessions.length);
					//load JSON event into cart service
					ShoppingCartService.setJsonEvent(self.event);
					//Get previous locations
					for (var i=0; i<self.locations.length; i++) {
						self.locations[i] = ShoppingCartService.getLocations($state.params.eventid,i);
					}

				}, function errorCallback(response) {
					self.event = null;
				});
			
			$(document).foundation();

			$scope.$on('REMOVE_LOCATION', function(e, data) {
				//Synchronizaton with remove icon from shopping_cart view
				if (typeof self.locations != 'undefined') {
					self.locations[data] = 0;
				}
			});

			$scope.pushLocation = function (eventid,sessionid) {
				self.locations[sessionid] = angular.copy(ShoppingCartService.pushLocation(eventid,sessionid));
			}

			$scope.popLocation = function (eventid,sessionid) {
				self.locations[sessionid] = angular.copy(ShoppingCartService.popLocation(eventid,sessionid));
			}

		}]
	});