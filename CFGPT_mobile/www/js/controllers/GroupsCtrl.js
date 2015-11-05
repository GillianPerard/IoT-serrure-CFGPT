angular.module('CFGPT_Mobile.controllers.GroupsCtrl', [
	'CFGPT_Mobile.services.GroupsService'])
	.controller('GroupsCtrl', ['$scope', 'GroupsService', function ($scope, GroupsService) {
		GroupsService.getGroups(function (result, error) {
			if (!result && error) {
				alert(error);
			} else {
				$scope.groups = result;
			}
		})
		
	}]);
	
	