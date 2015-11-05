angular.module('CFGPT_Mobile.services.ConnectedObjectsService', [])

	.service('ConnectedObjectsService', function ($http, ConstantService) {

		this.getConnectedObjects = function (groupId, callback) {

			if (groupId < 0) {
				$http.get(ConstantService.baseUrl + '/app/connectedobjects/').then(
				function (success) {
					callback(success.data);
				},
				function (error) {
					callback(undefined, error);
				});
			} else {
				$http.get(ConstantService.baseUrl + '/app/groups/' + groupId + '/connectedobjects').then(
				function (success) {
					callback(success.data);
				},
				function (error) {
					callback(undefined, error);
				});
			}
		};
	});
