angular.module('CFGPT_Mobile.controllers.GroupUsersCtrl', [
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupUsersCtrl', function ($state, $scope, $stateParams, $ionicModal, $ionicPopup, UserGroupsService, APIService) {

		var refresh = function () {
			UserGroupsService.getUserGroup($stateParams.groupId, function (result, error) {
				if (!result && error) {
					alert(error.err);
				} else {
					$scope.currentUserGroup = result;
				}
			});

			UserGroupsService.getGroupUsers($stateParams.groupId, function (result, error) {
				if (!result && error) {
					alert(error.err);
				} else {
					$scope.groupUsers = result;
				}
			});
		};

		refresh();


		$scope.assignUserData = {
			email: "",
			userId: 0,
			isAdmin: false,
			isToCall: false
		};

		$ionicModal.fromTemplateUrl('templates/assignUser.html', {
			scope: $scope
		}).then(function (modal) {
			$scope.modal = modal;
		});

		$scope.openAssign = function () {
			$scope.modal.show();
		};

		$scope.closeAssign = function () {
			$scope.modal.hide();
		};

		$scope.searchUser = function () {
			APIService.searchUser($scope.email,
				function (data, error) {
					if (data && !error) {
						$scope.returnUser = data;
						$scope.assignUserData.email = "";
					} else {
						alert(error);
					}
				});
		};

		$scope.doAssign = function () {
			UserGroupsService.assignUserToGroup($scope.currentUserGroup.group.id,
				function (data, error) {
					if (data && !error) {
						$scope.groupUsers.push(data);
						$scope.assignUserData = {};
					} else {
						alert(error);
					}
				});
		};


		$scope.removeGroupUser = function (groupUser) {
			$ionicPopup.confirm({
				title: 'Suppression du partage',
				template: 'Êtes-vous sûr de vouloir retirer cette personne de ce trousseau ?',
				buttons: [
					{
						text: 'Non',
						type: 'noBackground'
					},
					{
						text: '<b>Oui</b>',
						type: 'button-positive',
						onTap: function (e) {
							UserGroupsService.removeUserFromGroup($scope.currentUserGroup.group.id, groupUser.user.id,
								function (data, error) {
									if (!error) {
										$scope.groupUsers.pop(groupUser);
									} else {
										alert(error);
									}
								});
						}
					}
				]
			});
		};
	});