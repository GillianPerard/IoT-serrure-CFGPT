angular.module('CFGPT_Mobile.controllers.GroupCtrl', [
	'CFGPT_Mobile.services.ConnectedObjectsService'])
	.controller('GroupCtrl', ['$scope', '$stateParams', 'ConnectedObjectsService', function ($scope, $stateParams, ConnectedObjectsService) {
		ConnectedObjectsService.list($stateParams.groupId, function (result, error) {
			if (!result && error) {
				alert(error.data.err);
			} else {
				$scope.group = result;
			}
		});
	}]);