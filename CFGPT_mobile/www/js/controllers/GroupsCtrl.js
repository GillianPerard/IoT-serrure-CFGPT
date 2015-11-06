angular.module('CFGPT_Mobile.controllers.GroupsCtrl', [
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupsCtrl', function ($scope, UserGroupsService, APIService, $ionicPopup, $state, $window, AccountService) {
		
		$scope.AccountSerice = AccountService;
		
		UserGroupsService.getMyUserGroups(function (result, error) {
			if (!result && error) {
				alert(error.err);
			} else {
				$scope.groups = result;
			}
		});

		$scope.newGroup = function () {
			$scope.data = {}
			// An elaborate, custom popup
			var myPopup = $ionicPopup.show({
				template: '<input type="text" ng-model="data.groupName" placeholder="Nom" style="border: 1px solid #EEE;padding:5px">',
				title: 'Nouveau groupe',
				scope: $scope,
				buttons: [
					{ text: 'Annuler',
					  type: 'noBackground'
					},
					{
						text: '<b>Ajouter</b>',
						type: 'button-positive',
						onTap: function (e) {
							if (!$scope.data.groupName) {
								//don't allow the user to close unless he enters wifi password
								e.preventDefault();
							} else {
								addGroup($scope.data.groupName);
							}
						}
					}
				]
			}); 
		};

		var addGroup = function (groupName) {
			APIService.groups.add(groupName,
				function (data) {
					$window.location.reload(true)
					console.log("Groupe ajouté !");
				},
				function (error) {
					alert(error);
				});
			};
		
		var deleteGroup = function (groupId) {
			APIService.groups.remove(groupId,
				function (data) {
					console.log("Groupe supprimé !");
					$window.location.reload(true);
				},
				function (error) {
					alert(error);
				});
			};

		$scope.removeGroup = function (groupId) {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Suppression de trousseau',
				template: 'Êtes-vous sûr de vouloir supprimer ce trousseau ?',
				buttons: [
					{ text: 'Non',
					  type: 'noBackground'
					},
					{
						text: '<b>Oui</b>',
						type: 'button-positive',
						onTap: function (e) {
							deleteGroup(groupId);
						}
					}
				]
			});
		};
	});
	
	