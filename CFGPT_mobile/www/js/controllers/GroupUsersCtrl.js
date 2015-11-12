angular.module('CFGPT_Mobile.controllers.GroupUsersCtrl', [
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupUsersCtrl', function ($state, $scope, $stateParams, $ionicPopup, ConnectedObjectsService, UserGroupsService) {

		var refresh = function () {
			UserGroupsService.getUserGroup($stateParams.groupId, function (result, error) {
				if (!result && error) {
					alert(error.err);
				} else {
					$scope.currentUserGroup = result;
				}
			});

			UserGroupsService.getGroupUsers($stateParams.groupId, function (result, error) {
				if (!result && error) {
					alert(error.err);
				} else {
					$scope.users = result;
				}
			});
		};

		refresh();
	});