angular.module('CFGPT_Mobile.services.GroupsService', [])

  .service('GroupsService', function ($http, ConstantService) {
    this.groups = undefined;

    this.getGroups = function (callback) {
      if (!this.groups) {
        $http.get(ConstantService.baseUrl + '/app/users/groups').then(
          function (success) {
            groups = success.data;
            callback(groups);
          },
          function (error) {
            callback(undefined, error);
          });
      } else {
        callback(groups);
      }
    };

    this.getGroup = function (id) {
      return groups[id];
    }
  });
