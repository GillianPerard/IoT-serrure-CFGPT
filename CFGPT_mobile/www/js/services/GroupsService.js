angular.module('CFGPT_Mobile.services.GroupsService', [])

  .service('GroupsService', function () {
    var groups = [
      {
        "connectedobjects": [
          {
            "name": "Porte Entrée",
            "token": "fefedeizzef84zfse8fz",
            "state": "fermé",
            "id": 1,
            "createdAt": "2015-10-23T11:53:51.000Z",
            "updatedAt": "2015-10-23T11:53:52.000Z"
          },
          {
            "name": "Garage",
            "token": "efrzed755dez8ez4se",
            "state": "fermé",
            "id": 2,
            "createdAt": "2015-10-23T11:55:05.000Z",
            "updatedAt": "2015-10-23T11:55:06.000Z"
          },
          {
            "name": "Cuisine",
            "token": "efzfsef5sfe554f8ef48",
            "state": "fermé",
            "id": 3,
            "createdAt": "2015-10-23T11:55:58.000Z",
            "updatedAt": "2015-10-23T11:55:59.000Z"
          },
          {
            "name": "MiniBar",
            "token": "ezf5ed5dzqd1de4ee",
            "state": "fermé",
            "id": 4,
            "createdAt": "2015-10-23T11:56:33.000Z",
            "updatedAt": "2015-10-23T11:56:33.000Z"
          }
        ],
        "groupusers": [
          {
            "user": 1,
            "group": 1,
            "is_admin": true,
            "is_to_call": true,
            "id": 8,
            "createdAt": "2015-10-23T12:24:50.000Z",
            "updatedAt": "2015-10-23T12:25:05.000Z"
          },
          {
            "user": 2,
            "group": 1,
            "is_admin": false,
            "is_to_call": true,
            "id": 9,
            "createdAt": "2015-10-23T12:25:54.000Z",
            "updatedAt": "2015-10-23T12:26:10.000Z"
          },
          {
            "user": 3,
            "group": 1,
            "is_admin": false,
            "is_to_call": false,
            "id": 10,
            "createdAt": "2015-10-23T12:24:50.000Z",
            "updatedAt": "2015-10-23T12:25:06.000Z"
          },
          {
            "user": 4,
            "group": 1,
            "is_admin": false,
            "is_to_call": false,
            "id": 11,
            "createdAt": "2015-10-23T12:25:51.000Z",
            "updatedAt": "2015-10-23T12:26:06.000Z"
          }
        ],
        "name": "Famille Bouvier",
        "id": 1,
        "createdAt": "2015-10-23T12:22:37.000Z",
        "updatedAt": "2015-10-23T12:22:38.000Z"
      },
      {
        "connectedobjects": [
          {
            "name": "Bureaux",
            "token": "uujgjjgjg5jggj4y7ky4d",
            "state": "fermé",
            "id": 5,
            "createdAt": "2015-10-23T11:57:13.000Z",
            "updatedAt": "2015-10-23T11:57:13.000Z"
          },
          {
            "name": "Batiment",
            "token": "hukyubnknk4jb84yuj4",
            "state": "fermé",
            "id": 6,
            "createdAt": "2015-10-23T11:57:45.000Z",
            "updatedAt": "2015-10-23T11:57:45.000Z"
          },
          {
            "name": "SalleServeur",
            "token": "gjbunkyk4kny8k4nyb8",
            "state": "fermé",
            "id": 7,
            "createdAt": "2015-10-23T11:58:29.000Z",
            "updatedAt": "2015-10-23T11:58:29.000Z"
          },
          {
            "name": "PlacardSecurisé",
            "token": "unyiunkjjnynjb8jb4y8b",
            "state": "fermé",
            "id": 8,
            "createdAt": "2015-10-23T11:59:07.000Z",
            "updatedAt": "2015-10-23T11:59:08.000Z"
          }
        ],
        "groupusers": [
          {
            "user": 5,
            "group": 2,
            "is_admin": true,
            "is_to_call": true,
            "id": 12,
            "createdAt": "2015-10-23T12:24:51.000Z",
            "updatedAt": "2015-10-23T12:25:07.000Z"
          },
          {
            "user": 6,
            "group": 2,
            "is_admin": false,
            "is_to_call": false,
            "id": 13,
            "createdAt": "2015-10-23T12:25:51.000Z",
            "updatedAt": "2015-10-23T12:24:07.000Z"
          },
          {
            "user": 7,
            "group": 2,
            "is_admin": false,
            "is_to_call": true,
            "id": 14,
            "createdAt": "2015-10-23T12:25:52.000Z",
            "updatedAt": "2015-10-23T12:26:07.000Z"
          }
        ],
        "name": "Entreprise Soft Perf",
        "id": 2,
        "createdAt": "2015-10-23T12:22:47.000Z",
        "updatedAt": "2015-10-23T12:22:48.000Z"
      }
    ];

    this.getGroups = function () {
      return groups;
    };

    this.getGroup = function (id) {
      return groups[id];
    }
  });
