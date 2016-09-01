'use strict';

// Register `sessions` component, along with its associated controller and template
angular.
  module('sessions').
  component('sessions', {
    templateUrl: 'sessions/sessions.template.html',
    controller: ['$http', function SessionsController($http) {
      var self = this;
      self.orderProp = '-sessions.date';
      $http.get('assets/data/event-info-68.json').then(function(response) {
        self.event = response.data;
      });
      $(document).foundation();
    }]
  });