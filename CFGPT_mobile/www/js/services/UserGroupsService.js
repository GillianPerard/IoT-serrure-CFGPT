angular.module('CFGPT_Mobile.services.UserGroupsService', [])

  .service('UserGroupsService', function (APIService) {
    this.myUserGroups = undefined;

    this.getMyUserGroups = function (callback) {
      if (!this.myUserGroups) {
        APIService.userGroups.list(
          function (success) {
            myUserGroups = success;
            callback(myUserGroups);
          },
          function (error) {
            callback(undefined, error);
          });
      } else {
        callback(myUserGroups);
      }
    };

    this.getUserGroup = function (id, callback) {
      if (!this.myUserGroups) {
        this.getMyUserGroups(function (result, error) {
          if (!error && result) {
            callback(result[id - 1]);
          } else {
            callback(undefined, error);
          }
        });
      } else {
        callback(myUserGroups[id - 1]);
      }
    }
  });
