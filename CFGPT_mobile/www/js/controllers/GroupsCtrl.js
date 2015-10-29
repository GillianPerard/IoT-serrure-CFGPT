angular.module('CFGPT_Mobile.controllers.GroupsCtrl', [])
	.controller('GroupsCtrl', ['$scope', 'GroupsService', function ($scope, GroupsService) {
		$scope.groups = GroupsService.getGroups();
		
		$scope.showHomeIcon = function(id){
			if(GroupsService.getGroups()[id].type == "HOUSE"){
				return true;
			}
		}
		
		$scope.showSuitcaseIcon = function(id){
			if(GroupsService.getGroups()[id].type == "JOB"){
				return true;
			}
		}
		
		$scope.showRocketIcon = function(id){
			if(GroupsService.getGroups()[id].type == "OTHER"){
				return true;
			}
		}
		
	}]);
	
	