angular.module('CFGPT_Mobile.controllers.ConnectedObjectCtrl', [])

	.controller('ConnectedObjectCtrl', function ($scope, $stateParams, $ionicPopup, ConnectedObjectsService, UserGroupsService) {

		var init = function () {
			if ($stateParams.connectedObject && $stateParams.connectedObject != "") {
				$scope.detail = $stateParams.connectedObject;
			} else {
				ConnectedObjectsService.getByToken($stateParams.objectToken, function (data, error) {
					if (!data && error) {
						alert(error);
					} else {
						$scope.detail = data;
					}
				});
			}

			if ($stateParams.userGroup && $stateParams.userGroup != "") {
				$scope.userGroup = $stateParams.userGroup;
				getLogs();
			} else {
				UserGroupsService.getUserGroup($stateParams.groupId, function (result, error) {
					if (!result && error) {
						alert(error.err);
					} else {
						$scope.userGroup = result;
						getLogs();
					}
				});
			}
		};

		var getLogs = function () {
			if (!$scope.userGroup.is_admin) {
				return;
			}

			ConnectedObjectsService.getLogs($stateParams.objectToken,
				function (logs, error) {
					if (!logs && error) {
						alert(error.err);
					} else {
						$scope.logs = logs;
					}
				});
		};

		$scope.assignToGroup = function () {
			$scope.assignedUserGroups = [];
			UserGroupsService.getMyUserGroups(function (groups, error) {
				if (!groups && error) {
					alert(error);
					return;
				}

				$scope.allGroups = groups;
				$ionicPopup.show({
					templateUrl: 'templates/assignGroup.html',
					title: 'Ajouter à un autre trousseau',
					scope: $scope,
					buttons: [
						{
							text: 'Annuler',
							type: 'noBackground'
						},
						{
							text: '<b>Ajouter</b>',
							type: 'button-positive',
							onTap: function (e) {
								e.preventDefault();
								$scope.assignedUserGroups.forEach(function (userGroup, index) {
									ConnectedObjectsService.assignToGroup(userGroup.group.id, $scope.detail.id,
										function (data, error) {
											
										});
								});
							}
						}
					]
				});
			});
		};

		init();

	});