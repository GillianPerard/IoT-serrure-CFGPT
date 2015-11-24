angular.module('CFGPT_Mobile.services.UserGroupsService', [])

  .service('UserGroupsService', function (APIService) {
    var myUserGroups = undefined;

    this.getMyUserGroups = function (callback) {
      if (!myUserGroups) {
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
      if (!myUserGroups) {
        this.getMyUserGroups(function (result, error) {
          if (!error && result) {
            callback(result.find(function (group) { return group.group.id == id; }));
          } else {
            callback(undefined, error);
          }
        });
      } else {
        callback(myUserGroups.find(function (group) { return group.group.id == id; }));
      }
    }

    this.newGroup = function (groupName, callback) {
      APIService.groups.add(groupName,
        function (userGroup) {
          myUserGroups.push(userGroup);
          callback();
        },
        function (error) {
          callback(error);
        });
    };

    this.removeUserGroup = function (userGroup, callback) {
      APIService.groups.remove(userGroup.group.id,
        function (success) {
          myUserGroups.pop(userGroup);
          callback();
        },
        function (error) {
          callback(error);
        });
    };

    this.getGroupUsers = function (groupId, callback) {
      APIService.groups.getGroupUsers(groupId,
        function (data) {
          callback(data);
        },
        function (error) {
          callback(undefined, error);
        });
    };

    this.assignUserToGroup = function (groupId, userInfo, callback) {
      APIService.groups.assignUserToGroup(groupId, userInfo,
        function (data) {
          callback(data);
        },
        function (error) {
          callback(undefined, error);
        });
    };

    this.updateUserFromGroup = function (groupId, groupUser, callback) {
      APIService.groups.updateUserFromGroup(groupId, groupUser,
        function (data) {
          callback(data);
        },
        function (error) {
          callback(undefined, error);
        });
    };

    this.removeUserFromGroup = function (groupId, userId, callback) {
      APIService.groups.removeUserFromGroup(groupId, userId,
        function (data) {
          callback(data);
        },
        function (error) {
          callback(undefined, error);
        });
    };
  });
