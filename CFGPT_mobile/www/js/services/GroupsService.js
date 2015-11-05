angular.module('CFGPT_Mobile.services.GroupsService', [])

  .service('GroupsService', function ($http, ConstantService) {
    this.groups = undefined;

    $http.get(ConstantService.baseUrl + '/groups').then(
      function (success) {
        this.groups = success.data;
      },
      function (error) {

      });

    this.getGroups = function () {
      return this.groups;
    };

    this.getGroup = function (id) {
      return this.groups[id];
    }
  });
