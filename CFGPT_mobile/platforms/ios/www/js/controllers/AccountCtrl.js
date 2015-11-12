angular.module('CFGPT_Mobile.controllers.AccountCtrl', [])

	.controller('AccountCtrl', function ($scope, $ionicModal, AccountService, $state, $ionicPopup,$localStorage) {
		
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
					showAlert('Erreur', 'Connexion échouée : mail ou mot de passe invalide (ou les deux lol).');
					console.log('error on login', error);
				}
				else{
					AccountService.init();
					$state.go("app.groups");    				
					io.socket.get('/app/ConnectedObject/subscribe/'+ $localStorage.user.token, function(data,jwres){
					        console.log(data)
					        console.log(jwres)
				      });
				      io.socket.on('connectedobjects',function(msg){
				        console.log(msg)

				        // TODO : insérer la logique de notification après un ringring
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

	});