angular.module('CFGPT_Mobile.controllers.AppCtrl', [])

	.controller('AppCtrl', function ($scope, AccountService , $ionicModal, $timeout, $state) {
		
		$scope.AccountService = AccountService;
		
		// Log out
		$scope.doLogout = function(){
			console.log('Doing logout');
			
			AccountService.logout();
			$state.go("login");
		}
		
		$scope.imagePath = function(imgPath){
			if(imgPath != null) return true;
			else return false;
		}
		
	});