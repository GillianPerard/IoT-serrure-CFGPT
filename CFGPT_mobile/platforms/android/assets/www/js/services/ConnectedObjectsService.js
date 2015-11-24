angular.module('CFGPT_Mobile.services.ConnectedObjectsService', [])

	.service('ConnectedObjectsService', function (APIService) {

		this.list = function (groupId, callback) {
			if (groupId < 0) {
				APIService.connectedObjects.list(
					function (data) {
						callback(data);
					},
					function (error) {
						callback(undefined, error);
					});
			} else {
				APIService.groups.listConnectedObject(groupId,
					function (data) {
						callback(data);
					},
					function (error) {
						callback(undefined, error);
					});
			}
		};

		this.getByToken = function (objectToken, callback) {
			APIService.connectedObjects.getByToken(objectToken,
				function (data) {
					callback(data);
				},
				function (error) {
					callback(undefined, error);
				});
		};

		this.getLogs = function (objectToken, callback) {
			APIService.connectedObjects.getLogs(objectToken,
				function (data) {
					callback(data);
				},
				function (error) {
					callback(undefined, error);
				});
		};

		this.add = function (groupId, connectedObject, callback) {
			APIService.connectedObjects.add(connectedObject,
				function (data) {
					APIService.connectedObjects.assignToGroup(groupId, data.id,
						function (success) {
							callback(data);
						},
						function (error) {
							callback(undefined, error);
						});
				},
				function (error) {
					callback(undefined, error);
				});
		};

		this.remove = function (connectedObject, callback) {
			APIService.connectedObjects.remove(connectedObject.token,
				function (data) {
					callback(data);
				},
				function (error) {
					callback(undefined, error);
				});
		};

		this.changeStateAfterRing = function(tokenObject, newState, callback){
			APIService.connectedObjects.changeStateAfterRing(tokenObject, newState,
				function (data) {
					callback(data);
				},
				function (error) {
					callback(undefined, error);
				}
			);
		}



		this.openDoor = function (connectedObject, callback) {
			APIService.connectedObjects.changeState(connectedObject.token, "Ouvert",
				function (data) {
					callback(data);
				},
				function (error) {
					callback(undefined, error);
				});
		};

		this.closeDoor = function (connectedObject, callback) {
			APIService.connectedObjects.changeState(connectedObject.token, "Fermé",
				function (data) {
					callback(data);
				},
				function (error) {
					callback(undefined, error);
				});
		};
	});
