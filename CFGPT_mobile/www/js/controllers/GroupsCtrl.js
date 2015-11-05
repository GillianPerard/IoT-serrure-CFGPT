angular.module('CFGPT_Mobile.controllers.GroupsCtrl', [
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupsCtrl', function ($scope, UserGroupsService, APIService) {
		var refreshGroups = UserGroupsService.getMyUserGroups(function (result, error) {
			if (!result && error) {
				alert(error.err);
			} else {
				$scope.groups = result;
			}
		});

		this.newGroup = function () {
			// TODO : ajouté le code pour la fenêtre modal d'ajout 
		};

		this.addGroup = function () {
			APIService.groups.add($scope.groupName,
				function (data) {
					refreshGroups();
					alert("Groupe ajouté");
				},
				function (error) {
					alert(error);
				});
		};

		refreshGroups();
	});
	
	