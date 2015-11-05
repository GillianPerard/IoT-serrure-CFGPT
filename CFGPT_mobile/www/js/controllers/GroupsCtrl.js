angular.module('CFGPT_Mobile.controllers.GroupsCtrl', [
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupsCtrl', function ($scope, UserGroupsService, APIService) {
		UserGroupsService.getMyUserGroups(function (result, error) {
			if (!result && error) {
				alert(error.err);
			} else {
				$scope.groups = result;
			}
		});

		$scope.newGroup = function () {
			// TODO : ajouté le code pour la fenêtre modal d'ajout 
		};

		var addGroup = function () {
			APIService.groups.add($scope.groupName,
				function (data) {
					// refreshGroups();
					alert("Groupe ajouté");
				},
				function (error) {
					alert(error);
				});
		};

		$scope.removeGroup = function (userGroup) {
			APIService.groups.add(userGroup.group.id,
				function (data) {
					// refreshGroups();
					alert("Groupe supprimé !");
				},
				function (error) {
					alert(error);
				});
		};
	});
	
	