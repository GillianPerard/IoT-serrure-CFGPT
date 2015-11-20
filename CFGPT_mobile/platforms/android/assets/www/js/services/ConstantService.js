angular.module('CFGPT_Mobile.services.ConstantService', [])

	.service('ConstantService', function ($localStorage) {

		// initialisation de l'application notamment le Local Storage
		this.InitApp = function (AccountService) {
			$localStorage.$default({
				user: undefined
			});
			AccountService.init();
		},

		this.contains = function (array, item) {
			var isContains = false;
			var i = 0;
			while(i < array.length && isContains == false){
				if (array[i] == item) {isContains = true;};
				i++;
			}
			return isContains;
		},

		this.containsWithLabel = function (array, item, label) {
			var isContains = false;
			var i = 0;
			while(i < array.length && isContains == false){
				if (array[i][label] == item) {isContains = true;};
				i++;
			}
			return isContains;
		};
	});