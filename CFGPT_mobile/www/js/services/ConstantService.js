angular.module('CFGPT_Mobile.services.ConstantService', [])

	.service('ConstantService', function ($localStorage) {
		this.baseUrl = "http://localhost:1337";

		// initialisation de l'application notamment le Local Storage
		this.initApp = function () {
			$localStorage.$default({
				user: undefined
			});
		}
		
	});