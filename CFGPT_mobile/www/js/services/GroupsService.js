angular.module('CFGPT_Mobile.services.GroupsService', [])

  .service('GroupsService', function () {
    var groups = [
      { title: 'Maison principale', id: 0, type: "HOUSE" },
      { title: 'Bureau', id: 1, type: "JOB" },
      { title: 'Cabanne au fond du jardin', id: 2, type: "AUTRE" },
      { title: 'Maison secondaire', id: 3, type: "HOUSE" },
      { title: 'Pied à terre', id: 4, type: "HOUSE" },
      { title: 'Cabanne au fond du jardin', id: 5, type: "CASTEL" }
    ];

    this.getGroups = function () {
      return groups;
    };

    this.getGroup = function (id) {
      return groups[id];
    }
  });
