'use strict';

angular.
	module('shoppingCart').
	service('ShoppingCartService', function() {
		
		var self = this;
		var session_ele = {
			date: '',
			locations: 0
		};
		var sessions_ele = [session_ele]
		var event_ele = {
			event: {
				id: 0,
				title: ''
			},
			sessions: sessions_ele
		};
		//cart array
		var cart = [];

		//JSON events
		var json_events = [];
		var actual_event_json = null;
		var actual_event = 0;

		//Set event from JSON on session page loaded
		self.setJsonEvent = function(e) {
			for (var i in json_events) {
				//console.log("i: " + i);
				if (json_events[i].event.id === e.event.id) {
					//TODO if exists recover locations
					actual_event_json = json_events[i];
					return(0);
				}
			}
			//if no exists, set event
			json_events.push(e);
			actual_event_json = e;
		}

		//addEvent method create a new event in cart if not already exists
		self.addEvent = function () {
			//if this is new event, add it in cart array
			for (var i in cart) {
				if (cart[i].event.id === actual_event_json.event.id) {
					actual_event = i;
					//if exists do nothing
					return(0);
				}
			}
			//if no exists create a new event
			sessions_ele = [session_ele];
			for (var j in actual_event_json.sessions) {
				sessions_ele[j] = {
					date: actual_event_json.sessions[j].date,
					locations: 0
				};
			}
			event_ele = {
				event: {
					id: actual_event_json.event.id,
					title: actual_event_json.event.title
				},
				sessions: sessions_ele
			};
			cart.push(event_ele);
		}

		//Remove event when no locations found
		self.removeEvent = function (numevent) {
			var total_locations = 0;
			for (var i in cart[numevent].sessions) {
				if (cart[numevent].sessions[i].locations > 0) {
					total_locations += cart[numevent].sessions[i].locations;
				}
			}
			if (total_locations == 0) {
				cart.splice(numevent, 1);
			}
		}

		//get cart from shopping cart view
		self.getCart = function () {
			return cart;
		}

		//remove session from cart
		self.removeSession = function (eventid,sessionid) {
			cart[self.getEventNumber(eventid)].sessions[sessionid].locations = 0;
			self.removeEvent(self.getEventNumber(eventid));
		}

		//push location from session view
		self.pushLocation = function (eventid,sessionid) {
			self.addEvent();
			var cart_session = cart[self.getEventNumber(eventid)].sessions[sessionid];
			if (cart_session.locations < actual_event_json.sessions[sessionid].availability) {
				cart_session.locations++;
				actual_event_json.sessions[sessionid].locations = cart_session.locations;
			}
			return cart_session.locations;
		}

		//pop location from session view
		self.popLocation = function (eventid,sessionid) {
			var cart_actual_event = cart[self.getEventNumber(eventid)];
			if (cart_actual_event != null && cart_actual_event.sessions[sessionid].locations > 0) {
				cart_actual_event.sessions[sessionid].locations--;
				self.removeEvent(actual_event);
				return cart_actual_event.sessions[sessionid].locations;
			}
			return 0;
		}

		//get number of event from event id
		self.getEventNumber = function (eventid) {
			for (var i in cart) {
				if (cart[i].event.id === eventid) {
					return i;
				}
			}
		}

	});