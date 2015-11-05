angular.module('CFGPT_Mobile.services.ConnectedObjectsService', [])

	.service('ConnectedObjectsService', function ($http, ConstantService) {
		this.currentConnectedObjects = undefined;

		this.getConnectedObjects = function (groupId, callback) {
			if (!this.currentConnectedObjects) {
				$http.get(ConstantService.baseUrl + '/app/groups/' + groupId + '/connectedobjects').then(
					function (success) {
						currentConnectedObjects = success.data;
						callback(currentConnectedObjects);
					},
					function (error) {
						callback(undefined, error);
					});
			} else {
				callback(currentConnectedObjects);
			}
		};
	});
