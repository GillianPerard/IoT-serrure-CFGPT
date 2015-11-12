angular.module('CFGPT_Mobile.controllers.GroupCtrl', [
	'CFGPT_Mobile.services.ConnectedObjectsService',
	'CFGPT_Mobile.services.UserGroupsService'])
	.controller('GroupCtrl', function ($state, $scope, $stateParams, $ionicPopup, ConnectedObjectsService, UserGroupsService) {

		var keys = [];

		var refresh = function () {
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
					keys = result;
					$scope.keys = keys;
				}
			});
		};

		refresh();

		$scope.newKey = function () {
			$scope.data = {};
			var popup = $ionicPopup.show({
				template: '<div class="list list-inset"><label class="item item-input"><input type="text" ng-model="data.name" placeholder="Nom"></label><label class="item item-input"><input type="text" ng-model="data.token" placeholder="Clé ID"></label></div>',
				title: 'Nouvelle clé',
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

		$scope.removeKey = function (key) {
			$ionicPopup.confirm({
				title: 'Suppression de la clé',
				template: 'Êtes-vous sûr de vouloir supprimer cette clé ?',
				buttons: [
					{
						text: 'Non',
						type: 'noBackground'
					},
					{
						text: '<b>Oui</b>',
						type: 'button-positive',
						onTap: function (e) {
							ConnectedObjectsService.remove(key,
								function (data, error) {
									if (!error) {
										$scope.keys.pop(key);
										keys = $scope.keys;
									} else {
										alert(error);
									}
								});
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


		
		$scope.isOpen = function (state) {
			if (state == "Ouvert") return true;
			else if (state == "Fermé") return false;
		};


		$scope.changeState = function (_idKey, _state) {
			keys.forEach(function (element, index, array) {
				if (element['id'] == _idKey){
					element.state = _state;
				}
			});
			$scope.keys = keys; //push({name:'test'});
			return;
		};
		
	});