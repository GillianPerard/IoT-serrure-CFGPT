angular.module('CFGPT_Mobile.controllers.AccountCtrl', [
	'CFGPT_Mobile.controllers.GroupCtrl',
	'CFGPT_Mobile.services.ConnectedObjectsService'
])

	.controller('AccountCtrl', function (
		$scope, $ionicModal, AccountService, ConnectedObjectsService, $state, $ionicPopup,$localStorage, ConstantService) {
		
		/* Signup section */

		$scope.signupData = {};

		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/signup.html', {
			scope: $scope
		}).then(function (modal) {
			$scope.modal = modal;
		});

		// Open the login modal
		$scope.signup = function () {
			console.log("Open sign up modal.");
			$scope.modal.show();
		};

		// Triggered in the login modal to close it
		$scope.closeSignup = function () {
			console.log("Hide sign up modal.");
			$scope.modal.hide();
		};

		$scope.doSignUp = function () {
			var user = $scope.signupData
			var formIsValid = true;
			var content = "Les champs suivants ne sont pas valides :\r\n"
			if (!user.lastname) {
				content += "• Nom\r\n";
				formIsValid = false;
			}

			if (!user.firstname) {
				content += "• Prénom\r\n";
				formIsValid = false;
			}

			if (!user.email) {
				content += "• E-mail\r\n";
				formIsValid = false;
			}

			if (!user.password) {
				content += "• Password\r\n";
				formIsValid = false;
			}

			if (!user.repeatpassword || user.repeatpassword != user.password) {
				content += "\r\n Les mots de passe saisis ne sont pas identiques !";
				formIsValid = false;
			}

			if (!formIsValid) {
				showAlert("Informations incomplètes !", content);
			} else {
				AccountService.signup(user, function (error) {
					if (!error) {
						$scope.modal.hide();
						$state.go("app.groups");
					} else {
						showAlert('Une erreur est survenue', error);
					}
				});
			}
		};
		
		
		/* Login section */

		$scope.loginData = {};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function () {
			console.log('Doing login', $scope.loginData);

			AccountService.login($scope.loginData, function (error) {
				if (error != undefined) {
					showAlert('Erreur', 'Connexion échouée : mail et/ou mot de passe invalide.');
					console.log('error on login', error);
				}
				else{
					$state.go("app.groups");
					//Dès qu'on reçoit une notif web-socket
					io.socket.get('/app/ConnectedObject/subscribe/'+ $localStorage.user.token, function(data,jwres){
						console.log(data);
						console.log(jwres);
					});
					//Gestion WebSocket pour les connectedobjects
					io.socket.on('connectedobjects',function(websock){
						if (websock.verb == 'updated'){
							if (websock.data['notif']){ //Si c'est une pop-up de notif ouvert/fermé.
								$ionicPopup.confirm({
									title: 'Quelqu\'un sonne !',
									template: 'La serrure nommée "'+websock.data['name']+'" demande votre attention. Qu\'allez-vous faire ?',
									buttons: [{
										text: 'Fermer',
										type: 'noBackground',
										onTap: function (e) {
											ConnectedObjectsService.changeStateAfterRing(
												websock.data['token'],
												'Fermé',
												function (data, error) {
													if (!error) {
														if (data['id'] == undefined) { //Action déjà effectuée par un autre utilisateur
                                                            showAlertBis('Trop tard !', 'Un autre utilisateur a répondu avant vous.');
														} //Sinon, rien à faire.
													}
												}
											);
										}},{
										text: '<b>Ouvrir</b>',
										type: 'button-positive',
										onTap: function (e) {
											ConnectedObjectsService.changeStateAfterRing(
												websock.data['token'],
												'Ouvert',
												function (data, error) {
													if (!error) {
														if (data['id'] == undefined) { //Action déjà effectuée par un autre utilisateur
                                                            showAlertBis('Trop tard !', 'Un autre utilisateur a répondu avant vous.');
														} //Sinon, rien à faire.
													}
												}
											);
										}}
									]
								});
							} else {
								refreshChangeState($state, websock, websock.data['state']);
							}
						}
					});
				}
			});
		};
		
		/* Utils section */
		var showAlert = function (title, content) {
			var alertPopup = $ionicPopup.alert({
				title: title,
				template: content
			});
			// alertPopup.then(function (res) {
			// 	console.log('Thank you for not eating my delicious ice cream cone');
			// });
		};

        var showAlertBis = function (title, content) {
            $ionicPopup.alert({
                title: title,
                template: content
            });
        };

		//Quand il y a un changement d'état, on doit rafraichir le design
		var refreshChangeState = function (_state, _websket, _newState){
			if (_state.current.name == 'app.single'){
				if (ConstantService.containsWithLabel(_websket.data['groupIds'], _state.params.groupId, 'id')) {
					//REFRESH DE LA PAGE
					ctrl = _state.$current.locals['menuContent@app'].$scope;
					ctrl.changeState(_websket.id, _newState);
					ctrl.$digest();
				}
			}
		};

	});