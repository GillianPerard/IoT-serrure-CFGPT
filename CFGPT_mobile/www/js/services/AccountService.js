angular.module('CFGPT_Mobile.services.AccountService', [])

  .service('AccountService', function ($http, ConstantService) {
    var currentUser;

    this.login = function (user, callback) {
      $http.post(ConstantService.baseUrl + '/app/login', user).then(
        function successCallback(params) {
          currentUser = params;
          callback();
        },
        function errorCallback(params) {
          callback(params);
        });
    }

    this.IsConnected = function () {
      return currentUser != undefined;
    }
  });
