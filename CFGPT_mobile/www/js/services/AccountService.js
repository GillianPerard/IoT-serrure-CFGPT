angular.module('CFGPT_Mobile.services.AccountService', [])

  .service('AccountService', function ($http, ConstantService) {
    this.login = function (user) {
      var constant = ConstantService;
      $http.post(constant.baseUrl + '/app/login', user).then(function successCallback(params) {
        
      },
      function errorCallback(params) {
        
      });
    }


  });
