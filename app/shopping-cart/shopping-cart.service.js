'use strict';

angular.
	module('shoppingCart').
	service('ShoppingCartService', function() {
		var self = this;
		//to create unique event id
		var eid = 0;
		//actual cart event
		var actual_event = 0;
		//JSON event
		var event = null;
		var session_ele = {
			date: '',
			locations: 0
		};
		var event_ele = {
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

		//save method create a new event if not already exists
		//else update the existing object
		self.saveEvent = function (event) {
			//if this is new event, add it in cart array
			//console.log("saveEvent");
			//console.log("event.event.id: "+event.event.id);
			for (var i in cart) {
				//console.log("cart[i].event.id: "+cart[i].event.id);
				if (cart[i].event.id === event.event.id) {
					//console.log("ya existe");
					return(0);
				}
			}
			actual_event = eid++;
			//console.log("no existe > lo creamos");
			cart[actual_event].event = event_ele;
			cart[actual_event].event.event.id = event.event.id;
			cart[actual_event].event.event.title = event.event.title;
			cart[actual_event].event.sessions = event.sessions;
			for (var j in event.sessions) {
				cart[actual_event].event.sessions[j].locations = 0;
			}
		}

		//simply search events list for given id
		//and returns the event object if found
		self.getEvent = function (id) {
			for (var i in events) {
				if (events[i].event.id == id) {
					return events[i].event;
				}
			}
		}

		//iterate through events list and delete 
		//event if found
		self.deleteEvent = function (id) {
			for (var i in events) {
				if (events[i].event.id == id) {
					events.splice(i, 1);
				}
			}
			eid--;
		}

		//simply returns the events list
		self.listEvents = function () {
			return events;
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
		self.deleteSession = function (sessionid) {
			var sessions = event.sessions;
			console.log("deleteSession: event.session["+sessionid+"]");
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
			var eventid = event.event.id;
			self.saveEvent(event);
			var cart_session = cart[actual_event].sessions[sessionid];

			if (cart_session.locations < event.sessions[sessionid].availability) {
				cart_session.locations++;
			}
			
			return cart_session.locations;
		}

		self.popLocation = function (sessionid) {
			console.log("popLocation: event.session["+sessionid+"]");
			var session = event.sessions[sessionid];
			if (session.locations > 0) {
				session.locations--;
				if (session.locations == 0) {
					self.deleteSession(sessionid);
				}
			}
		}

	});