'use strict';

// Register `sessions` component, along with its associated controller and template
angular.
  module('sessions').
  component('sessions', {
    templateUrl: 'sessions/sessions.template.html',
    controller: ['$http', '$state', function SessionsController($http, $state) {
      var self = this;
      self.orderProp = '-sessions.date';

      $http.
        get('assets/data/event-info-'+$state.params.eventid+'.json').
        then(function successCallback(response) {
          self.event = response.data;
        }, function errorCallback(response) {
          self.event = null;
        });
      
      $(document).foundation();
      
    }]
  });