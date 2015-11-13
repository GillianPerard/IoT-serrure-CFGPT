/**
 * GroupsController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    
    /* GROUPS */
    
    //Création d'un groupe (name) + ajout du user dans le groupe
    addGroup: function (req, res) {
        var _name = req.param('name');
        var _tokenUser = req.headers.authorization;
        
        //Si il manque des params, on drop.
        if (!_name || !_tokenUser) return res.serverError({ 'state': 'PARAMS ERROR.' });
        
        Groups.create({
            name: _name,
        }).exec(function (err, newGroup) {
            if (err) return res.serverError({ 'state': 'Error when trying update database', 'error': err });
            if (newGroup) {
                Users.findOneByToken(_tokenUser).exec(function (err, theUser) {
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
            if (err) return res.json(400, { err: 'ERROR.' });
            if (!isFound) return res.json(400, { err: 'ERROR.' });
            
            //Suppression finale du groupe
            Groups.destroy({ id: _groupId }).exec(function (err, groupToDestroy) {
                if (err) return res.json(400, { err: 'ERROR.' });
                
                return res.send(groupToDestroy);
            });
        });
    },
    
    
    /* USERS */
    
    // Récupère les informations des users du group de l'id passé en paramètre (+ les infos associées à son groupuser)
    getUsers: function (req, res) {
        //var plop = req.query.user;
        var _groupId = req.param('groupId');
        
        if (!_groupId) return res.json(400, { err: 'No groupId param.' });
        
        Groups.findOneById(_groupId).exec(function (err, group) {
            if (!group) return res.json(400, { err: 'No group found.' });
            GroupUsers.find({ group: group.id }).populate('user').exec(function (err, userWithGroup) {
                if (userWithGroup.length == 0) return res.json(400, { err: 'No groupuser found.' });
                return res.send(userWithGroup);
            });
        });
    },
    
    // Associe un user à un group (selon les params)
    assignUserById: function (req, res) {
        var _groupId = req.param('groupId');
        var _userId = req.param('userId');
        var _isAdmin = req.param('isAdmin');
        var _isToCall = req.param('isToCall');
        
        //Si il manque un des params "idUser" ou "groupId", on drop.
        if (!_groupId || !_userId) return res.json(400, { err: 'PARAMS ERROR.' });
        
        Groups.findOneById(_groupId).exec(function (err, isFound) {
            if (err) return res.json(400, { err: 'ERROR.' });
            if (!isFound) return res.json(400, { err: 'ERROR.' });
            
            Users.findOneById(_userId).exec(function (err, user) {
                if (err) return res.json(400, { err: 'ERROR.' });
                if (!user) return res.json(400, { err: 'ERROR.' });
                
                GroupUsers.count({ group: _groupId, user: _userId }).exec(function (err, groupUser) {
                    if (err) return res.json(400, { err: 'ERROR.' });
                    if (groupUser > 0) return res.json(400, { err: 'USER IS ALREADY IN GROUP.' });
                    
                    GroupUsers.create({
                        group: _groupId,
                        user: _userId,
                        is_admin: (_isAdmin == "true"? 1 : 0),
                        is_to_call: (_isToCall == "true"? 1 : 0)
                    }).exec(function (err, finalGroupUser) {
                        if (err) return res.json(400, { err: 'ERROR.' });

                        GroupUsers.findOne(finalGroupUser).populate('user').exec(function (err, found) {
                            return res.ok(found);
                        });
                    });
                });
            });
        });
    },
    
    // Retire un user d'un group (selon les params), s'il en fait bien parti
    removeUserById: function (req, res) {
        var _groupId = req.param('groupId');
        var _userId = req.param('userId');
        
        //Si il manque des params, on drop.
        if (!_groupId || !_userId) return res.json(400, { err: 'PARAMS ERROR.' });
        
        Groups.findOneById(_groupId).exec(function (err, isFound) {
            if (err) return res.json(400, { err: 'ERROR.' });
            if (!isFound) return res.json(400, { err: 'ERROR.' });
            
            Users.findOneById(_userId).exec(function (err, isFound) {
                if (err) return res.json(400, { err: 'ERROR.' });
                if (!isFound) return res.json(400, { err: 'ERROR.' });
                
                GroupUsers.findOne({ group: _groupId, user: _userId }).exec(function (err, groupUser) {
                    if (err) return res.json(400, { err: 'ERROR.' });
                    if (!groupUser) return res.json(400, { err: 'USER IS NOT IN GROUP.' });
                    
                    GroupUsers.destroy({ id: groupUser.id }).exec(function (err, groupToDestroy) {
                        if (err) return res.json(400, { err: 'ERROR.' });
                        return res.send(groupToDestroy);
                    });
                });
            });
        });
    },
    
    
    /* CONNECTED OBJECTS */
    
    getConnectedObjects : function (req, res) {
        var groupId = req.param('groupId');
        
        if (!groupId) return res.json(400, { err: 'No groupId param.' });
        
        Groups.findOne({ id: groupId })
      .populate('connectedobjects')
      .exec(function (err, group) {
            if (!group) return res.json(400, { err: 'No group found.' });
            /*
        if (group.connectedobjects.length == 0) return res.json(400,{err:'No connectedobjects found.'});
        */

        return res.json(group.connectedobjects);
        })

    },
    
    // Associe un connectedObject à un group (selon les params)
    assignConnectedObjectById: function (req, res) {
        var _groupId = req.param('groupId');
        var _conObjId = req.param('conObjId');
        
        //Si il manque un des params "conObjId" ou "groupId", on drop.
        if (!_groupId || !_conObjId) return res.json(400, { err: 'PARAMS ERROR.' });
        
        Groups.findOneById(_groupId)
      .populate('connectedobjects')
      .populate('parentgroup')
      .exec(function (err, group) {
            if (err) return res.json(400, { err: 'ERROR.' });
            if (!group) return res.json(400, { err: 'ERROR.' });
            
            ConnectedObjects.findOneById(_conObjId)
          .populate('groups')
          .exec(function (err, connectedObject) {
                if (err) return res.json(400, { err: 'ERROR.' });
                if (!connectedObject) return res.json(400, { err: 'ERROR.' });
                
                // Si le group est déjà lié des COs
                if (group.connectedobjects.length > 0) {
                    // on va vérifier qu'il n'est pas déjà lié à celui ci
                    var alreadyLinked = false;
                    group.connectedobjects.forEach(function (obj, index) {
                        if (obj.token == connectedObject.token) alreadyLinked = true;
                    });
                    if (alreadyLinked) return res.json(400, { err: 'ERROR. - already linked' });
                };
                
                // Si le group a un parent id, le connectedObject à ajouter doit y être lié
                if (group.parentgroup) {
                    var goodGood = false;
                    connectedobject.groups.forEach(function (obj, index) {
                        if (obj.id == group.parentgroup.id) { goodGood = true };
                    });
                    if (!goodGood) return res.json(400, { err: 'ERROR. - where is the link with dad' });
                };
                
                group.connectedobjects.add(connectedObject);
                group.save(function (err, saved) {
                    if (err) return res.json(400, { err: 'ERROR.' });
                    return res.send("success");

                });

            });
        });
    },
    removeConnectedObjectById: function (req, res) {
        var _groupId = req.param('groupId');
        var _conObjId = req.param('conObjId');
        
        //Si il manque un des params "conObjId" ou "groupId", on drop.
        if (!_groupId || !_conObjId) return res.json(400, { err: 'PARAMS ERROR.' });
        
        Groups.findOneById(_groupId)
      .populate('connectedobjects')
      .populate('parentgroup')
      .exec(function (err, group) {
            if (err) return res.json(400, { err: 'ERROR.' });
            if (!group || group.length == 0) return res.json(400, { err: 'ERROR.' });
            
            var findCO = false;
            group.connectedobjects.forEach(function (obj, index) {
                if (obj.id == _conObjId) findCO = true;
            });
            // Si on ne retrouve le CO avec l'id demandé dans le groupe demandé
            if (!findCO) return res.json(400, { err: 'ERROR. - no link between this 2 entities' });
            
            // suppresion du lien
            group.connectedobjects.remove(_conObjId);
            console.log("suppresion du lien")
            
            var finalStep = function () {
                group.save(function (err, saved) {
                    if (err) return res.json(400, { err: 'ERROR.' });
                    console.log("save suppresion du lien")
                    res.send("success")
                });
            };
            var coRemove = function (connectedObject) {
                // On supprime la clé
                ConnectedObjects.destroy(connectedObject.id).exec(function (err, cotoDestroy) {
                    if (err) return res.json(400, { err: 'ERROR.' });
                    console.log("suppression clés")
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
                        if (err) return res.json(400, { err: 'ERROR.' });
                        console.log("destroy ----" , err)
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
                    if (err) return res.json(400, { err: 'ERROR.' });
                    if (!connectedObject) return res.json(400, { err: 'ERROR.' });
                    console.log("co récupéré")
                    // on va nettoyer les liens avec les autres groups
                    // il existe au moins le lien avec le group concerné par la requete
                    if (connectedObject.groups.length > 1) {
                        connectedObject.groups.forEach(function (obj, index) {
                            // condition pour ne pas supprimer 2 fois le liens l'objet et le group de la req
                            if (obj.parentgroup) connectedObject.groups.remove(obj.id);
                        });
                        console.log("lien avec sous group deleted")
                        connectedObject.save(function (err, saved) {
                            if (err) return res.json(400, { err: 'ERROR.' });
                            console.log("save suppresion du lien avec les sous groups");
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
