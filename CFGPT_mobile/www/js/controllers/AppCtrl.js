angular.module('CFGPT_Mobile.controllers.AppCtrl', [])

	.controller('AppCtrl', function ($scope, AccountService , $ionicModal, $timeout) {
		
		$scope.AccountService = AccountService;
		
	});