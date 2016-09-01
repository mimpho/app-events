'use strict';

angular.
  module('eventsApp').
  directive('title', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
      return {
        link: function() {

          var listener = function(event, toState) {

            $timeout(function() {
              $rootScope.title = (toState && toState.title) 
              ? toState.title 
              : 'Default title';
            });
          };

          $rootScope.$on('$stateChangeSuccess', listener);
        }
      };
    }
  ]);