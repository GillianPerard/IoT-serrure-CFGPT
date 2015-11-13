
angular.module('CFGPT_Mobile.services.APIService', [])

	.service('APIService', function ($http) {
		var baseUrl = "http://localhost:1337";
		this.user = {
			login: function (user, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/login', user).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						if (!error.data) {
							callbackError({ status: "Une erreur esst survenue. Vérifiez vos paramètres réseaux", err: error.data });
						} else {
							callbackError(error.data);
						}
					});
			},

			signup: function (user, callbackSuccess, callbackError) {
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
				$http.post(baseUrl + '/app/connectedobjects/add', { name: connectedObject.name, tokenObject: connectedObject.token }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},
			
			getLog: function (objectToken, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/connectedobjects/logs', { tokenObject: objectToken }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			remove: function (objectToken, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/connectedobjects/remove', { tokenObject: objectToken }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			assignToGroup: function (groupId, connectedObjectId, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/groups/' + groupId + '/connectedobjects/assign', { conObjId: connectedObjectId }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			removeFromGroup: function (groupId, connectedObjectId, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/groups/' + groupId + '/connectedobjects/remove', { conObjId: connectedObjectId }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			changeStateAfterRing: function (tokenObject, newState, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/connectedobjects/changeStateAfterRing', {
					tokenObject: tokenObject,
					newState: newState
				}).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					}
				);
			},
			
			changeState: function (objectToken, state, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/connectedobjects/changeState', { tokenObject: objectToken, stateObject: state }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			}
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
			}
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

			getGroupUsers: function (groupId, callbackSuccess, callbackError) {
				$http.get(baseUrl + '/app/groups/' + groupId + '/users').then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			assignUserToGroup: function (groupId, userInfo, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/groups/' + groupId + '/users/assign', { userId: userInfo.userId, isAdmin: userInfo.isAdmin, isToCall: userInfo.isToCall }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			removeUserFromGroup: function (groupId, userId, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/groups/' + groupId + '/users/remove', { userId: userId }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			},

			searchUser: function (email, callbackSuccess, callbackError) {
				$http.post(baseUrl + '/app/users/getByMail', { email: email }).then(
					function (success) {
						callbackSuccess(success.data);
					},
					function (error) {
						callbackError(error.data);
					});
			}
		};

	});