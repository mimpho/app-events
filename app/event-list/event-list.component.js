'use strict';

// Register `eventList` component, along with its associated controller and template
angular.
  module('eventList',[
    'ngSanitize']
  ).
  component('eventList', {
    templateUrl: 'event-list/event-list.template.html',
    controller: ['$http', '$state', function EventListController($http, $state) {
      var self = this;
      self.orderProp = '-startDate';
      $http.get('assets/data/events.json').then(function(response) {
        self.events = response.data;
      });
      self.getEventInfo = function(id) {
        $state.go('sessions', {eventid: id});
      };
      $(document).foundation();
    }]
  });