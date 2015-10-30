angular.module('CFGPT_Mobile.services.AccountService', [])

  .service('AccountService', function ($http, $localStorage, ConstantService, $ionicHistory) {

    this.login = function (user, callback) {
      $http.post(ConstantService.baseUrl + '/app/login', user).then(
        function (success) {
          $ionicHistory.clearHistory();
          $localStorage.user = success.data;
          $http.defaults.headers.common['Authorization'] = $localStorage.user.token;
          this.IsConnected = true;
          callback();
        },
        function (error) {
          this.IsConnected = false;
          callback(error);
        });
    };

    this.logout = function () {
      this.IsConnected = false;
      delete $http.defaults.headers.common['Authorization'];
      $localStorage.user = undefined;
    };

    this.init = function () {
      if ($localStorage.user) {
        this.IsConnected = true;
        $http.defaults.headers.common['Authorization'] = $localStorage.user.token;
      }
    };

    this.IsConnected = false;
  });
