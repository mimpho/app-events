'use strict';

angular.
	module('shoppingCart').
	service('ShoppingCartService', ['$stateParams', function($stateParams) {
		var self = this;
		//number of events in cart
		var num_events = -1;
		//actual cart event
		var actual_event = 0;
		//JSON event
		var event = null;
		var session_ele = {
			date: '',
			locations: 0
		};
		var event_ele = {
			num_events: 0,
			event: {
				id: 0,
				title: ''
			},
			sessions: session_ele
		};
		//cart array
		var cart = [];

		//Load event from JSON
		self.init = function(e) {
			event = e;
		}
		console.log("eventid: " + $stateParams.eventid);

		//addEvent method create a new event in cart if not already exists
		self.addEvent = function () {
			//if this is new event, add it in cart array
			for (var i in cart) {
				if (cart[i].event.id === event.event.id) {
					//if exists do nothing
					return(0);
				}
			}
			//actual_event = $stateParams.eventid;
			num_events++;
			cart.push(event_ele);
			console.log(num_events);
			//cart[num_events] = event_ele;
			cart[num_events].event.id = event.event.id;
			cart[num_events].event.title = event.event.title;
			cart[num_events].sessions = event.sessions;
			for (var j in event.sessions) {
				cart[num_events].sessions[j].locations = 0;
			}
		}

		
		self.removeEvent = function (numevent) {
			var total_locations = 0;
			for (var i in cart[numevent].sessions) {
				if (cart[numevent].sessions[i].locations > 0) {
					total_locations += cart[numevent].sessions[i].locations;
				}
			}
			if (total_locations == 0) {
				num_events--;
				cart.splice(numevent, 1);
			}
			console.log(num_events);
		}

		self.getCart = function () {
			return cart;
		}
/*
		//simply search sessions list for given id
		//and returns the session object if found
		self.getSession = function (sessionid) {
			var sessions = event.sessions;
			console.log("getSession: event.session["+sessionid+"]");
			for (var i in sessions) {
				if (sessions[i].id == sessionid) {
					return sessions[i];
				}
			}
		}

		//simply returns the sessions list
		self.listSessions = function (eventid) {
			console.log("listSessions: session["+eventid+"]");
			return event.sessions;
		}
*/
		//remove session from cart
		self.removeSession = function (ievent,isession) {
			cart[ievent].sessions[isession].locations = 0;
			self.removeEvent(ievent);
		}

		//push location from session view
		self.pushLocation = function (sessionid) {
			self.addEvent();
			var cart_session = cart[num_events].sessions[sessionid];
			if (cart_session.locations < event.sessions[sessionid].availability) {
				cart_session.locations++;
			}
			return cart_session.locations;
		}

		//pop location from session view
		self.popLocation = function (sessionid) {
			var cart_actual_event = cart[num_events];
			if (cart_actual_event != null && cart_actual_event.sessions[sessionid].locations > 0) {
				cart_actual_event.sessions[sessionid].locations--;
				self.removeEvent(num_events);
				return cart_actual_event.sessions[sessionid].locations;
			}
			return 0;
		}

	}]);