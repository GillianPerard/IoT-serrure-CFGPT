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
					  type: 'noBackground button '
					},
					{
						text: '<b>Oui</b>',
						type: 'button-positive button-full',
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
	
	