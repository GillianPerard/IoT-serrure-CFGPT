angular.module('CFGPT_Mobile.controllers.GroupCtrl', [
	'CFGPT_Mobile.services.ConnectedObjectsService',
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupCtrl', function ($scope, $stateParams, ConnectedObjectsService, UserGroupsService) {

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
	});