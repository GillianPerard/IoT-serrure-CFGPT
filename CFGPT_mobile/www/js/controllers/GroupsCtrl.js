angular.module('CFGPT_Mobile.controllers.GroupsCtrl', [
	'CFGPT_Mobile.services.GroupsService'])
	.controller('GroupsCtrl', ['$scope', 'GroupsService', function ($scope, GroupsService) {
		$scope.groups = GroupsService.groups;
		
	}]);
	
	