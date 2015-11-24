/**
 * GroupsController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /* GROUPS */

    getGroup : function (req, res) {
      var groupId = req.param('groupId');
      var _tokenUser = req.session.userToken;

      if (!groupId || !_tokenUser) return res.notFound();

      Users.findOneByRefreshToken(_tokenUser).exec(function (err, currUser) {
        if (err) return res.notFound();
        if (!currUser)  return res.notFound();

        Groups.findOne({id: groupId}).exec(function (err, group) {
            if (!group) return res.notFound();

            GroupUsers.findOne({user: currUser.id, group:group.id}).exec(function (err, groupuser) {
              if (!groupuser) return res.notFound();

              return res.view('groups/consulter_trousseau', {
                _user: currUser,
                _group: group,
                _groupuser: groupuser
              });
            });
        });
      });

    },

    //Création d'un groupe (name) + ajout du user dans le groupe
    addGroup: function (req, res) {
        var _name = req.param('name');
        var _tokenUser = req.session.userToken;

        //Si il manque des params, on drop.
        if (!_name || !_tokenUser) return res.serverError({ 'state': 'PARAMS ERROR.' });

        Groups.create({
            name: _name,
        }).exec(function (err, newGroup) {
            if (err) return res.serverError({ 'state': 'Error when trying update database', 'error': err });
            if (newGroup) {
                Users.findOneByRefreshToken(_tokenUser).exec(function (err, theUser) {
                    if (err) return res.serverError({ 'state': 'Error when trying access database', 'error': err });
                    if (!theUser) return res.serverError({ 'state': 'There are no result' });
                    GroupUsers.create({
                        group: newGroup.id,
                        user: theUser.id,
                        is_admin: 1,
                        is_to_call: 1
                    }).exec(function (err, finalGroupUser) {
                        if (err) return res.serverError({ 'state': 'Error when trying update database', 'error' : err });

                        GroupUsers.findOne(finalGroupUser).populate('group').exec(function findOneCB(err, found) {
                            return res.ok(found);
                        });

                    });
                });
            }
        });
    },


    //Suppression d'un groupe en fonction d'un Id
    removeByGroupId: function (req, res) {
      var _groupId = req.param('groupId');
      if (!_groupId) return res.serverError({ 'state': 'PARAMS ERROR.' });

      Groups.findOneById(_groupId).exec(function (err, isFound) {
        if (err) return res.serverError({ 'state': 'Error when trying find groups :(', 'error': err });
        if (!isFound) return res.serverError({ 'state': 'No result :(' });

        //Suppression finale du groupe
        Groups.destroy({ id: _groupId }).exec(function (err, groupToDestroy) {
          if (err) return res.serverError({ 'state': 'Error when trying delete groups :(', 'error': err });

          return res.ok(groupToDestroy);
        });
      });
    },


    /* CONNECTED OBJECTS */

    getConnectedObjects : function (req, res) {
      var groupId = req.param('groupId');
      if (!groupId) return res.serverError({ 'state': 'Error with arguments :(' });

      Groups.findOne({ id: groupId }).populate('connectedobjects').exec(function (err, group) {
          if (!group) return res.serverError({ 'state': 'Error when trying find Groups :(', 'error': err });

          return res.view('groups/serrures/liste_serrures', {
            _group: group,
            layout: null
          });
        })
    },

    // Associe un connectedObject à un group (selon les params)
    assignConnectedObjectById: function (req, res) {
      var _groupId = req.param('groupId');
      var _conObjId = req.param('conObjId');

      //Si il manque un des params "conObjId" ou "groupId", on drop.
      if (!_groupId || !_conObjId) return res.serverError({ 'state': 'Error with arguments :(' });

      Groups.findOneById(_groupId)
        .populate('connectedobjects')
        .populate('parentgroup')
        .exec(function (err, group) {
          if (err) return res.serverError({ 'state': 'Error when trying find groups :(', 'error': err });
          if (!group) return res.serverError({ 'state': 'No group found :(' });

          ConnectedObjects.findOneById(_conObjId)
            .populate('groups')
            .exec(function (err, connectedObject) {
              if (err) return res.serverError({ 'state': 'Error when trying find ConnectedObject :(', 'error': err });
              if (!connectedObject) return res.serverError({ 'state': 'No connectedObject found :(' });

              // Si le group est déjà lié des COs
              if (group.connectedobjects.length > 0) {
                // on va vérifier qu'il n'est pas déjà lié à celui ci
                var alreadyLinked = false;
                group.connectedobjects.forEach(function (obj, index) {
                  if (obj.token == connectedObject.token) alreadyLinked = true;
                });
                if (alreadyLinked) return res.serverError({ 'state': 'Group already connected to this connectedObject ;)' });
              };

              // Si le group a un parent id, le connectedObject à ajouter doit y être lié
              if (group.parentgroup) {
                var goodGood = false;
                connectedobject.groups.forEach(function (obj, index) {
                  if (obj.id == group.parentgroup.id) { goodGood = true };
                });
                if (!goodGood) return res.serverError({ 'state': 'Error, there is no parent link with this group :(' });
              };

              group.connectedobjects.add(connectedObject);
              group.save(function (err, saved) {
                if (err) return res.serverError({ 'state': 'Error when trying save groups :(', 'error': err });
                return res.ok(saved);

              });

            });
        });
    },

  // Associe un connectedObject à un group (selon les params)
  assignConnectedObjectByToken: function (req, res) {
    var _groupId = req.param('groupId');
    var _conObjToken = req.param('conObjToken');

    //Si il manque un des params "conObjId" ou "groupId", on drop.
    if (!_groupId || !_conObjToken) return res.json(500, { 'message':'ERR_KO', 'state': 'Error with arguments :(' });

    ConnectedObjects.findOneByToken(_conObjToken)
      .populate('groups')
      .exec(function (err, connectedObject) {
        if (err) return res.json(500, { 'message':'ERR_KO', 'state': 'Error when trying find ConnectedObject :(', 'error': err });
        if (!connectedObject) return res.json(500, { 'message':'ERR_BAD_TOKEN', 'state': 'No connectedObject found :(' });

      Groups.findOneById(_groupId)
        .populate('connectedobjects')
        .populate('parentgroup')
        .exec(function (err, group) {
          if (err) return res.json(500,{ 'message':'ERR_KO', 'state': 'Error when trying find groups :(', 'error': err });
          if (!group) return res.json(500,{ 'message':'ERR_KO', 'state': 'No group found :(' });

          // Si le group est déjà lié des COs
          if (group.connectedobjects.length > 0) {
            // on va vérifier qu'il n'est pas déjà lié à celui ci
            var alreadyLinked = false;
            group.connectedobjects.forEach(function (obj, index) {
              if (obj.token == connectedObject.token) alreadyLinked = true;
            });
            if (alreadyLinked) return res.json(500,{ 'message':'ERR_ALREADY_LINKED', 'state': 'Group already connected to this connectedObject ;)' });
          };

          // Si le group a un parent id, le connectedObject à ajouter doit y être lié
          if (group.parentgroup) {
            var goodGood = false;
            connectedobject.groups.forEach(function (obj, index) {
              if (obj.id == group.parentgroup.id) { goodGood = true };
            });
            if (!goodGood) return res.json(500,{ 'message':'ERR_KO', 'state': 'Error, there is no parent link with this group :(' });
          };

          group.connectedobjects.add(connectedObject);
          group.save(function (err, saved) {
            if (err) return res.json(500,{ 'message':'ERR_KO', 'state': 'Error when trying save groups :(', 'error': err });
            return res.ok(saved);

          });

        });
    });
  },

  //Retire un objet connecté d'un groupe + suppression totale si plus associé à aucun groupe.
    removeConnectedObjectById: function (req, res) {
      var _groupId = req.param('groupId');
      var _conObjId = req.param('conObjId');

      //Si il manque un des params "conObjId" ou "groupId", on drop.
      if (!_groupId || !_conObjId) return res.serverError({ 'state': 'Error with arguments :(' });

      Groups.findOneById(_groupId)
        .populate('connectedobjects')
        .populate('parentgroup')
        .exec(function (err, group) {
          if (err) return res.serverError({ 'state': 'Error when trying find groups :(', 'error': err });
          if (!group || group.length == 0) return res.serverError({ 'state': 'No groups found :(' });

          var findCO = false;
          group.connectedobjects.forEach(function (obj, index) {
            if (obj.id == _conObjId) findCO = true;
          });
          // Si on ne retrouve le CO avec l'id demandé dans le groupe demandé
          if (!findCO) return res.serverError({ 'state': 'No link beetween this 2 entities :(', 'error': err });

          // suppresion du lien
          group.connectedobjects.remove(_conObjId);

          var finalStep = function () {
            group.save(function (err, saved) {
              if (err) return res.serverError({ 'state': 'Error when trying save group :(', 'error': err });
              res.ok(saved)
            });
          };
          var coRemove = function (connectedObject) {
            // On supprime la clé
            ConnectedObjects.destroy(connectedObject.id).exec(function (err, cotoDestroy) {
              if (err) return res.serverError({ 'state': 'Error when trying delete connectedObject :(', 'error': err });
              finalStep();
            });
          };
          var logClean = function (connectedObject) {
            // On nettoie les logs
            if (connectedObject.logs.length > 0) {
              var logToDestroy = [];

              connectedObject.logs.forEach(function (obj, index) {
                logToDestroy.push(obj.id);
              });
              if (logToDestroy.length > 0) { }
              Logs.destroy({ id: logToDestroy }).exec(function (err, logToDestroy) {
                if (err) return res.serverError({ 'state': 'Error when trying delete logs :(', 'error': err });
                coRemove(connectedObject);
              });
            } else {
              coRemove(connectedObject);
            }
          };
          // Si le group est un group sans parent il faut aussi supprimer la clé, ses logs et d'éventuel sous groups
          if (!group.parentgroup) {
            ConnectedObjects.findOneById(_conObjId)
              .populate("logs")
              .populate("groups")
              .exec(function (err, connectedObject) {
                if (err) return res.serverError({ 'state': 'Error when trying find ConnectObject :(', 'error': err });
                if (!connectedObject) return res.serverError({ 'state': 'No connectedObject found :(' });

                // on va nettoyer les liens avec les autres groups
                // il existe au moins le lien avec le group concerné par la requete
                if (connectedObject.groups.length > 1) {
                  connectedObject.groups.forEach(function (obj, index) {
                    // condition pour ne pas supprimer 2 fois le liens l'objet et le group de la req
                    if (obj.parentgroup) connectedObject.groups.remove(obj.id);
                  });
                  console.log("lien avec sous group deleted")
                  connectedObject.save(function (err, saved) {
                    if (err) return res.serverError({ 'state': 'Error when trying save connectedObject :(', 'error': err });
                    logClean(connectedObject);
                  });
                }
                else {
                  logClean(connectedObject);
                };
              });
          } else {
            finalStep();
          }

        });
    }


};
