angular.module('CFGPT_Mobile.services.ConnectedObjectsService', [])

	.service('ConnectedObjectsService', function (APIService) {

		this.list = function (groupId, callback) {
			if (groupId < 0) {
				APIService.connectedObjects.list(
					function (success) {
						callback(success.data);
					},
					function (error) {
						callback(undefined, error);
					});
			} else {
				APIService.groups.listConnectedObject(groupId,
					function (success) {
						callback(success.data);
					},
					function (error) {
						callback(undefined, error);
					});
			}
		};

		this.getByToken = function (objectToken, callback) {
			$http.post(ConstantService.baseUrl + '/app/connectedobjects/get', objectToken).then(
				function (success) {
					callback(success.data);
				},
				function (error) {
					callback(undefined, error);
				});
		};

		this.add = function (connectedObject, callback) {
			$http.post(ConstantService.baseUrl + '/app/connectedobjects/add', connectedObject).then(
				function (success) {
					callback(success.data);
				},
				function (error) {
					callback(undefined, error);
				});
		};

		this.remove = function (objectToken, callback) {
			$http.post(ConstantService.baseUrl + '/app/connectedobjects/remove', objectToken).then(
				function (success) {
					callback(success.data);
				},
				function (error) {
					callback(undefined, error);
				});
		};
	});
