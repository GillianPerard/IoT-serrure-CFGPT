angular.module('CFGPT_Mobile.services.GroupsService', [])

  .service('GroupsService', function ($http, ConstantService) {
    this.groups = undefined;

    this.getGroups = function (callback) {
      if (!this.groups) {
        $http.get(ConstantService.baseUrl + '/app/users/groups').then(
          function (success) {
            this.groups = success.data;
            callback(this.groups);
          },
          function (error) {
            callback(undefined, error);
          });
      } else {
        callback(this.groups);
      }
    };

    this.getGroup = function (id) {
      return this.groups[id];
    }
  });
