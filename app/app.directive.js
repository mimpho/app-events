'use strict';

angular.
  module('eventsApp').
  directive('title', ['$rootScope', '$timeout', '$compile',
    function($rootScope, $timeout, $compile) {
      return {
        link: function(scope, element, attrs) {

          var listener = function(event, toState) {

            $timeout(function() {
              $rootScope.title = (toState.data && toState.data.pageTitle) 
              ? toState.data.pageTitle 
              : 'Default title';
            });
            console.log("directive");
            $compile(element.contents())(scope);
            $(document).foundation();
          };

          $rootScope.$on('$stateChangeSuccess', listener);
        }
      };
    }
  ]);