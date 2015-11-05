angular.module('CFGPT_Mobile.controllers.ConnectedObjectCtrl', [])

	.controller('ConnectedObjectCtrl', function ($scope, $stateParams, ConnectedObjectsService) {
		var objectToken = !$stateParams.connectedObject ? $stateParams.objectToken : $stateParams.connectedObject.objectToken;
		
		ConnectedObjectsService.getByToken(objectToken, function (data, error) {
			$scope.detail = data;
		});
	});