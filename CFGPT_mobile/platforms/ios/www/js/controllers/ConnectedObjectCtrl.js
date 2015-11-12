angular.module('CFGPT_Mobile.controllers.ConnectedObjectCtrl', [])

	.controller('ConnectedObjectCtrl', function ($scope, $stateParams, ConnectedObjectsService) {

		if ($stateParams.connectedObject) {
			$scope.detail = $stateParams.connectedObject;
		}

		ConnectedObjectsService.getByToken($stateParams.objectToken, function (data, error) {
			if (!data && error) {
				alert(error);
			} else {
				$scope.detail = data;
			}
		});
	});