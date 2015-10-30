angular.module('CFGPT_Mobile.services.AccountService', [])

  .service('AccountService', function ($http, $localStorage, ConstantService, $ionicHistory) {
    
    this.login = function (user, callback) {
      $http.post(ConstantService.baseUrl + '/app/login', user).then(
        function successCallback(params) {
          $localStorage.user = params;
          $ionicHistory.clearHistory();
          callback();
        },
        function errorCallback(params) {
          callback(params);
        });
    }
    
    this.logout = function () {
      currentUser = undefined;
      $localStorage.user = undefined;
    }

    this.IsConnected = function () {
      return $localStorage.user != undefined;
    }
  });
