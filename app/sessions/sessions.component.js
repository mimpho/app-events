'use strict';

// Register `sessions` component, along with its associated controller and template
angular.
  module('sessions').
  component('sessions', {
    templateUrl: 'sessions/sessions.template.html',
    controller: ['$http', '$state', function SessionsController($http, $state) {
      var self = this;
      alert($state.params.eventid);
      self.orderProp = '-sessions.date';
      $http.get('assets/data/event-info-68.json').then(function(response) {
        self.event = response.data;
      });
      $(document).foundation();
    }]
  });