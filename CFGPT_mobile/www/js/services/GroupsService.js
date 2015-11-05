angular.module('CFGPT_Mobile.services.GroupsService', [])

  .service('GroupsService', function (APIService) {
    this.groups = undefined;

    this.getGroups = function (callback) {
      if (!this.groups) {
        APIService.groups.list(
          function (success) {
            groups = success;
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
