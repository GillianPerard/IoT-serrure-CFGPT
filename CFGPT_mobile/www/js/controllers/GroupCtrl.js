angular.module('CFGPT_Mobile.controllers.GroupCtrl', [
	'CFGPT_Mobile.services.ConnectedObjectsService',
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupCtrl', function ($state, $scope, $stateParams, ConnectedObjectsService, UserGroupsService) {


	
	$scope.currentUserGroup = {group:{name: "test"}};
		UserGroupsService.getUserGroup($stateParams.groupId, function (result, error) {
			if (!result && error) {
				alert(error.err);
			} else {
				$scope.currentUserGroup = result;
			}
		});

		ConnectedObjectsService.list($stateParams.groupId, function (result, error) {
			if (!result && error) {
				alert(error.err);
			} else {
				$scope.keys = result;
			}
		});

		$scope.viewDetail = function (connectedObject) {
			$state.go("app.connectedObjects", {
				objectToken: connectedObject.token,
				group: $scope.currentUserGroup,
				connectedObject: connectedObject
			});
		}
	});