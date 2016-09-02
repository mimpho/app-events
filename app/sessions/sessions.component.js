'use strict';

// Register `sessions` component, along with its associated controller and template
angular.
  module('sessions').
  component('sessions', {
    templateUrl: 'sessions/sessions.template.html',
    controller: ['$http', '$state', function SessionsController($http, $state) {
      var self = this;
      self.locations = null;
      self.orderProp = '-sessions.date';

      self.pushLocation = function pushLocation(index) {
        if (self.locations[index] < self.event.sessions[index].availability)
          self.locations[index]++;
      };
      self.popLocation = function popLocation(index) {
        if (self.locations[index] > 0)
          self.locations[index]--;
      };

      $http.
        get('assets/data/event-info-'+$state.params.eventid+'.json').
        then(function successCallback(response) {
          self.event = response.data;
          self.locations = new Array(self.event.sessions.length);

        }, function errorCallback(response) {
          self.event = null;
        });
      
      $(document).foundation();
      
    }]
  });