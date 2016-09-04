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

		$scope.saveSession = function () {
			ShoppingCartService.saveSession($scope.newsession);
			$scope.newsession = {};
		}

		$scope.deleteSession = function (id) {
			ShoppingCartService.deleteSession(id);
			if ($scope.newsession.id == id) $scope.newsession = {};
		}

		self.pushLocation = function (sessionid) {
			console.log(ShoppingCartService.pushLocation(sessionid));
			self.locations = ShoppingCartService.pushLocation(sessionid);
		}
/*
		$scope.edit = function (id) {
			$scope.newsession = angular.copy(ShoppingCartService.get(id));
		}
		*/
		}]
	});