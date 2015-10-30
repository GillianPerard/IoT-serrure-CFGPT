angular.module('CFGPT_Mobile.controllers.GroupCtrl', [])
	.controller('GroupCtrl', ['$scope', '$stateParams' ,'GroupsService', function ($scope, $stateParams, GroupsService) {
		$scope.group = GroupsService.getGroup($stateParams.groupId);
	}]);