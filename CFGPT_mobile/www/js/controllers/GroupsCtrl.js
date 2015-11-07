angular.module('CFGPT_Mobile.controllers.GroupsCtrl', [
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupsCtrl', function ($scope, UserGroupsService, $ionicPopup) {
				
		var refresh = function () {
			UserGroupsService.getMyUserGroups(function (result, error) {
				if (!result && error) {
					alert(error.err);
				} else {
					$scope.groups = result;
				}
			});
		};
		
		refresh();
		
		$scope.newGroup = function () {
			$scope.data = {}
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
							e.preventDefault();
							if ($scope.data.groupName) {
								UserGroupsService.newGroup($scope.data.groupName,
									function (error) {
										if (!error) {
											myPopup.close();
										} else {
											alert(error);
										}
									});
							}
						}
					}
				]
			}); 
		};

		$scope.removeGroup = function (userGroup) {
			$ionicPopup.confirm({
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
							UserGroupsService.removeUserGroup(userGroup,
								function (error) {
									if (error) {
										alert(error);
									}
								});
						}
					}
				]
			});
		};
	});
	
	