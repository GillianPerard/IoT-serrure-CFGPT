angular.module('CFGPT_Mobile.controllers.GroupUsersCtrl', [
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupUsersCtrl', function ($state, $scope, $stateParams, $ionicModal, $ionicPopup, UserGroupsService) {

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
					$scope.users = result;
				}
			});
		};

		refresh();


		$scope.assignUserData = {
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
			
		};

		$scope.doAssign = function () {
			UserGroupsService.assignUserToGroup($scope.currentUserGroup.group.id,
				function (data, error) {
					if (data && !error) {
						$scope.users.push(data);
						$scope.assignUserData = {};
					} else {
						alert(error);
					}
				});
		};


		$scope.removeUser = function (user) {
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
							UserGroupsService.removeUserFromGroup($scope.currentUserGroup.group.id, user.id,
								function (data, error) {
									if (!error) {
										$scope.users.pop(user);
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