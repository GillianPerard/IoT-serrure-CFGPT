var baseUrl = "http://localhost:1337";
angular.module('CFGPT_Mobile.services.APIService', [])

	.service('APIService', function ($http) {

		this.user = {
			login: function (user, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/login', user).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},
			
			signup : function (user, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/account/new_account', user).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			}
		};

		this.connectedObjects = {
			// list: function (callbackSuccess, callbackError) {
			// 	$http.get(baseUrl + '/app/connectedobjects/').then(
			// 		function (success) {
			// 			callbackSuccess(success.data);
			// 		},
			// 		function (error) {
			// 			callbackError(error.data);
			// 		});
			// },

			getByToken: function (objectToken, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/connectedobjects/get', { tokenObject: objectToken }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			add: function (connectedObject, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/connectedobjects/add', connectedObject).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			remove: function (objectToken, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/connectedobjects/remove', objectToken).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},
		};

		this.userGroups = {
			list: function (callbackSuccess, callbackError) {
				$http.get(baseUrl + '/app/users/groups').then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},
		}

		this.groups = {
			listConnectedObject: function (groupId, callbackSuccess, callbackError) {
				$http.get(baseUrl + '/app/groups/' + groupId + '/connectedobjects').then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			add: function (groupName, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/groups/add', { name: groupName }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			remove: function (groupId, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/groups/remove', { groupId: groupId }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},
		};
		
	});