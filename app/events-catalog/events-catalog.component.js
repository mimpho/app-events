'use strict';

// Register `eventsCatalog` component, along with its associated controller and template
angular.
  module('eventsCatalog').
  component('eventsCatalog', {
    templateUrl: 'events-catalog/events-catalog.template.html',
    controller: ['$http', function CatalogController($http) {
      var self = this;
      self.orderProp = 'age';

      $http.get('assets/data/events.json').then(function(response) {
        self.events = response.data;
      });
    }]
  });
