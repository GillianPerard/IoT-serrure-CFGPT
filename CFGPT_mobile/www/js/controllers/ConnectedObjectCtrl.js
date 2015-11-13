angular.module('CFGPT_Mobile.controllers.ConnectedObjectCtrl', [])

	.controller('ConnectedObjectCtrl', function ($scope, $stateParams, ConnectedObjectsService) {

		$scope.detail = $stateParams.connectedObject;
		$scope.userGroup = $stateParams.userGroup;

		ConnectedObjectsService.getByToken($stateParams.objectToken, function (data, error) {
			if (!data && error) {
				alert(error);
			} else {
				$scope.detail = data;
			}
		});
	});