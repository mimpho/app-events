'use strict';

angular.
	module('shoppingCart').
	service('ShoppingCartService', function() {
		var self = this;
		//to create unique event id
		var eid = 1;
		//events array
		var events = [{
			id: 0,
			title: '',
			sid: 1,
			sessions: [{
				id: 0,
				date: '',
				available: 0,
				locations: 0
			}]
		}];

		//save method create a new event if not already exists
		//else update the existing object
		self.saveEvent = function (event) {
			if (event.id == null) {
				//if this is new event, add it in events array
				event.id = eid++;
				events.push(event);
			} else {
				//for existing event, find this event using id
				//and update it.
				for (i in events) {
					if (events[i].id == event.id) {
						events[i] = event;
					}
				}
			}
		}

		//simply search events list for given id
		//and returns the event object if found
		self.getEvent = function (id) {
			for (i in events) {
				if (events[i].id == id) {
					return events[i];
				}
			}
		}

		//iterate through events list and delete 
		//event if found
		self.deleteEvent = function (id) {
			for (i in events) {
				if (events[i].id == id) {
					events.splice(i, 1);
				}
			}
		}

		//simply returns the events list
		self.listEvents = function () {
			return events;
		}

		//save method create a new event if not already exists
		//else update the existing object
		self.saveSession = function (eventid, sessionid) {
			var sessions = events[eventid].sessions;
			var session = sessions[sessionid];
			if (session.sessionid == null) {
				console.log("saveSession >> new: events["+eventid+"].session["+sessionid+"]");
				//if this is new session, add it in sessions array
				session.id = session.sid++;
				sessions.push(session);
			} else {
				console.log("saveSession >> update: events["+eventid+"].session["+sessionid+"]");
				//for existing session, find this session using id
				//and update it.
				for (i in sessions) {
					if (sessions[i].id == session.id) {
						sessions[i] = session;
					}
				}
			}
		}

		//simply search sessions list for given id
		//and returns the session object if found
		self.getSession = function (eventid, sessionid) {
			var sessions = events[eventid].sessions;
			console.log("getSession: events["+eventid+"].session["+sessionid+"]");
			for (i in sessions) {
				if (sessions[i].id == sessionid) {
					return sessions[i];
				}
			}
		}

		//iterate through sessions list and delete 
		//session if found
		self.deleteSession = function (eventid, sessionid) {
			var sessions = events[eventid].sessions;
			console.log("deleteSession: events["+eventid+"].session["+sessionid+"]");
			for (i in sessions) {
				if (sessions[i].id == sessionid) {
					sessions.splice(i, 1);
				}
			}
		}

		//simply returns the sessions list
		self.listSessions = function (eventid) {
			console.log("listSessions: session["+eventid+"]");
			return events[eventid].sessions;
		}

		self.pushLocation = function (eventid, sessionid) {
			console.log("pushLocation: events["+eventid+"].session["+sessionid+"]");
			var session = events[eventid].sessions[sessionid];
			self.saveSession(eventid, sessionid);
			if (session.locations < session.available) {
				session.locations++;
			}
			return session.locations;
		}

		self.popLocation = function (eventid, sessionid) {
			console.log("popLocation: events["+eventid+"].session["+sessionid+"]");
			var session = events[eventid].sessions[sessionid];
			if (session.locations > 0) {
				session.locations--;
				if (session.locations == 0) {
					self.deleteSession(eventid, sessionid);
				}
			}
		}

	});