'use strict';

angular.
	module('shoppingCart').
	service('ShoppingCartService', function() {
		var self = this;
		//number of events in cart
		var num_events = 0;
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
		var cart = [event_ele];

		//Load event from JSON
		self.init = function(e) {
			event = e;
		}

		//addEvent method create a new event in cart if not already exists
		self.addEvent = function () {
			//if this is new event, add it in cart array
			for (var i in cart) {
				if (cart[i].event.id === event.event.id) {
					//if exists do nothing
					return(0);
				}
			}
			actual_event = num_events++;
			cart[actual_event] = event_ele;
			cart[actual_event].num_events = num_events;
			cart[actual_event].event.id = event.event.id;
			cart[actual_event].event.title = event.event.title;
			cart[actual_event].sessions = event.sessions;
			for (var j in event.sessions) {
				cart[actual_event].sessions[j].locations = 0;
			}
		}

		//iterate through events list and delete 
		//event if found
		self.removeEvent = function (id) {
			var total_locations = 0;
			for (var i in cart[actual_event].sessions) {
				if (cart[actual_event].sessions[i].locations > 0) {
					total_locations += cart[actual_event].sessions[i].locations;
				}
			}
			if (total_locations == 0) {
				num_events--;
				cart[actual_event].event = event_ele;
				cart[actual_event].event.title = "";
				cart[actual_event].num_events = num_events;
			}
		}

		self.getCart = function () {
			return cart;
		}

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

		//iterate through sessions list and delete 
		//session if found
		self.removeSession = function (sessionid) {
			var sessions = event.sessions;
			console.log("removeSession: event.session["+sessionid+"]");
			for (var i in sessions) {
				if (sessions[i].id == sessionid) {
					sessions.splice(i, 1);
				}
			}
		}

		//simply returns the sessions list
		self.listSessions = function (eventid) {
			console.log("listSessions: session["+eventid+"]");
			return event.sessions;
		}

		self.pushLocation = function (sessionid) {
			self.addEvent();
			var cart_session = cart[actual_event].sessions[sessionid];
			if (cart_session.locations < event.sessions[sessionid].availability) {
				cart_session.locations++;
			}
			return cart_session.locations;
		}

		self.popLocation = function (sessionid) {
			// TOOD Esta mal, solo hace bien el primer session
			var cart_actual_event = cart[actual_event];
			if (cart_actual_event != null && cart_actual_event.sessions[sessionid].locations > 0) {
				cart_actual_event.sessions[sessionid].locations--;
				self.removeEvent();
				return cart_actual_event.sessions[sessionid].locations;
			}
			return 0;
		}

	});