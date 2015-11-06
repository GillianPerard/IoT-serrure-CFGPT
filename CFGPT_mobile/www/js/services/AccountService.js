angular.module('CFGPT_Mobile.services.AccountService', [])

  .service('AccountService', function ($http, $localStorage, APIService, $ionicHistory) {

    this.IsConnected = false;

    var loginPrivate = function (user, callback) {
      APIService.user.login(user,
        function (success) {
          $ionicHistory.clearHistory();
          $localStorage.user = success;
          $http.defaults.headers.common['Authorization'] = success.token;
          this.IsConnected = true;
          callback();
        },
        function (error) {
          this.IsConnected = false;
          callback(error);
        });
    };
    this.login = loginPrivate;

    this.logout = function () {
      this.IsConnected = false;
      delete $http.defaults.headers.common['Authorization'];
      $localStorage.user = undefined;
    };

    this.signup = function (user, callback) {
      APIService.user.signup(user,
        function (data) {
          loginPrivate({ email: user.email, password: user.password }, function (error) {
            callback(error);
          })
        },
        function (error) {
          callback(error);
        });
    };

    this.init = function () {
      if ($localStorage.user) {
        this.IsConnected = true;
        $http.defaults.headers.common['Authorization'] = $localStorage.user.token;
      }
    };
  });
