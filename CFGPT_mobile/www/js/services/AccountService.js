angular.module('CFGPT_Mobile.services.AccountService', [])

  .service('AccountService', function ($http, $localStorage, ConstantService) {
    
    this.login = function (user, callback) {
      $http.post(ConstantService.baseUrl + '/app/login', user).then(
        function successCallback(params) {
          $localStorage.user = params;
          callback();
        },
        function errorCallback(params) {
          callback(params);
        });
    }

    this.IsConnected = function () {
      return $localStorage.user != undefined;
    }
  });
