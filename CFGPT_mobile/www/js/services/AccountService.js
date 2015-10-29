angular.module('CFGPT_Mobile.services.AccountService', [])

  .service('AccountService', function ($http, ConstantService) {
    var currentUser;

    this.login = function (user) {
      $http.post(ConstantService.baseUrl + '/app/login', user).then(function successCallback(params) {
        currentUser = params;
      },
        function errorCallback(params) {

        });
    }

    this.IsConnected = function () {
      return !currentUser;
    }
  });
