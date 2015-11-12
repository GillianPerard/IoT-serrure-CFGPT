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
				template: '<div class="list list-inset"><label class="item item-input"><input type="text" ng-model="data.groupName" placeholder="Nom"></label></div>',
				title: 'Nouveau trousseau',
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
					//$window.location.reload(true)
					var group = {};
					group.group = {name: groupName, id: data.group};

					console.dir(group);
					$scope.groups.push(group);
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
					  type: 'noBackground button '
					},
					{
						text: '<b>Oui</b>',
						type: 'button-positive button-full',
						onTap: function (e) {
							deleteGroup(groupId);
						}
					}
				]
			});
		};
	});
	
	