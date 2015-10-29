angular.module('CFGPT_Mobile.controllers.GroupsCtrl', [])
	.controller('GroupsCtrl', ['$scope', 'GroupsService', function ($scope, GroupsService) {
		$scope.playlists = GroupsService.getPlaylists();
	}]);