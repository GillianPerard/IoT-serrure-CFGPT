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

		this.add = function (connectedObject, callback) {
			APIService.connectedObjects.add(connectedObject,
				function (data) {
					callback(data);
				},
				function (error) {
					callback(undefined, error);
				});
		};

		this.remove = function (objectToken, callback) {
			APIService.connectedObjects.remove(objectToken,
				function (data) {
					callback(data);
				},
				function (error) {
					callback(undefined, error);
				});
		};
	});
