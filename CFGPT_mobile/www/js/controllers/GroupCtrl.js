angular.module('CFGPT_Mobile.controllers.GroupCtrl', [
	'CFGPT_Mobile.services.ConnectedObjectsService',
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupCtrl', function ($state, $scope, $stateParams, $ionicPopup, ConnectedObjectsService, UserGroupsService) {

		UserGroupsService.getUserGroup($stateParams.groupId, function (result, error) {
			if (!result && error) {
				alert(error.err);
			} else {
				$scope.currentUserGroup = result;
			}
		});

		ConnectedObjectsService.list($stateParams.groupId, function (result, error) {
			if (!result && error) {
				alert(error.err);
			} else {
				$scope.keys = result;
			}
		});
		
		$scope.newKey = function () {
			$scope.data = {};
			var popup = $ionicPopup.show({
				template: '<input type="text" ng-model="data.name" placeholder="Nom" style="border: 1px solid #EEE;padding:5px"><input type="text" ng-model="data.token" placeholder="Id de la clé" style="border: 1px solid #EEE;padding:5px">',
				title: 'Nouvelle clé',
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
							if ($scope.data.name && $scope.data.token) {
								ConnectedObjectsService.add($scope.currentUserGroup.group.id, $scope.data,
									function (newKey, error) {
										if (!newKey && error) {
											alert(error);
										} else {
											$scope.keys.push(newKey);
											popup.close();
										}
									});
							}
						}
					}
				]
			}); 
		};

		$scope.viewDetail = function (connectedObject) {
			$state.go("app.connectedObjects", {
				objectToken: connectedObject.token,
				group: $scope.currentUserGroup,
				connectedObject: connectedObject
			});
		};
	});