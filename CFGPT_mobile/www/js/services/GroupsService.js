angular.module('CFGPT_Mobile.services.GroupsService', [])

  .service('GroupsService', function () {
    var groups = [
<<<<<<< HEAD
      { title: 'Maison principale', id: 0 , type: "HOUSE",
        subgroups: [
          { title: "Toutes les clés", id: 5, 
            keysList: [
                {title: "Portail", id: 0},
                {title: "Porte d'entrée", id: 1},
                {title: "Atelier", id: 2},
                {title: "Local piscine", id: 3}
            ]
          },
          { title: "Enfants", id: 6, 
            keysList: [
                {title: "Portail", id: 0},
                {title: "Porte d'entrée", id: 1}
            ]
          }
        ]
      },
      { title: 'Bureau', id: 1 , type: "JOB"},
      { title: 'Cabanne au fond du jardin', id: 2 , type: "OTHER"},
      { title: 'Maison secondaire', id: 3 , type: "HOUSE"},
      { title: 'Pied à terre', id: 4 , type: "HOUSE"}
=======
      { title: 'Maison principale', id: 0, type: "HOUSE" },
      { title: 'Bureau', id: 1, type: "JOB" },
      { title: 'Cabanne au fond du jardin', id: 2, type: "AUTRE" },
      { title: 'Maison secondaire', id: 3, type: "HOUSE" },
      { title: 'Pied à terre', id: 4, type: "HOUSE" },
      { title: 'Cabanne au fond du jardin', id: 5, type: "CASTEL" }
>>>>>>> 9004ac2d23cceea59e09e37522f890bcb08a3664
    ];

    this.getGroups = function () {
      return groups;
    };

    this.getGroup = function (id) {
      return groups[id];
    }
  });
