/**
 * GroupsController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /* GROUPS */

  //Création d'un groupe (name, parentGroupId)
  addGroup: function (req, res) {
    var _name = req.param('name');
    //var _parentGroupId = req.param('parentGroupId');

    //Si il manque des params, on drop.
    if (!_name /*|| !_parentGroupId*/) return res.json(400,{err:'PARAMS ERROR.'});

    /* TODO - Gestion du parentID quand il le faudra */

    Groups.create({
      name:_name,
      //parentgroup:_parentGroupId,
    }).exec(function(err,parentgroup){
      if (err) return res.json(400,{err:'ERROR.'});
      return res.send(parentgroup);
    });
  },


  //Suppression d'un groupe en fonction d'un Id
  removeByGroupId: function (req, res) {
    var _groupId = req.param('groupId');
    if (!_groupId) return res.json(400,{err:'PARAMS ERROR.'});

    Groups.findOneById(_groupId).exec(function(err,isFound){
      if (err) return res.json(400,{err:'ERROR.'});
      if (!isFound) return res.json(400,{err:'ERROR.'});

      //Suppression finale du groupe
      Groups.destroy({id:_groupId}).exec(function (err, groupToDestroy){
        if (err) return res.json(400,{err:'ERROR.'});

        return res.send(groupToDestroy);
      });
    });
  },


  /* USERS */

  // Récupère les informations des users du group de l'id passé en paramètre (+ les infos associées à son groupuser)
	getUsers: function(req,res){
		//var plop = req.query.user;
    var _groupId = req.param('groupId');

		if (!_groupId) return res.json(400,{err:'No groupId param.'});

		Groups.findOneById(_groupId).exec(function(err, group){
			if (!group) return res.json(400,{err:'No group found.'});
			GroupUsers.find({group: group.id}).populate('user').exec(function(err, userWithGroup){
				if (userWithGroup.length == 0) return res.json(400,{err:'No groupuser found.'});
				return res.send(userWithGroup);
			});
		});
	},

  // Associe un user à un group (selon les params)
  assignUserById: function(req, res){
    var _groupId = req.param('groupId');
    var _userId = req.param('userId');
    var _isAdmin = req.param('isAdmin');
    var _isToCall = req.param('isToCall');

    //Si il manque un des params "idUser" ou "groupId", on drop.
    if (!_groupId || !_userId) return res.json(400,{err:'PARAMS ERROR.'});

    Groups.findOneById(_groupId).exec(function(err,isFound){
      if (err) return res.json(400,{err:'ERROR.'});
      if (!isFound) return res.json(400,{err:'ERROR.'});

      Users.findOneById(_userId).exec(function(err,isFound) {
        if (err) return res.json(400,{err:'ERROR.'});
        if (!isFound) return res.json(400,{err:'ERROR.'});

        GroupUsers.count({group: _groupId, user: _userId}).exec(function(err, groupUser){
          if (err) return res.json(400,{err:'ERROR.'});
          if (groupUser > 0) return res.json(400,{err:'USER IS ALREADY IN GROUP.'});

          GroupUsers.create({
            group:_groupId,
            user:_userId,
            is_admin: (_isAdmin == "true"? 1 : 0),
            is_to_call: (_isToCall == "true"? 1 : 0)
          }).exec(function(err,finalGroupUser){
            if (err) return res.json(400,{err:'ERROR.'});
            return res.send(finalGroupUser);
          });
        });
      });
    });
  },

  // Retire un user d'un group (selon les params), s'il en fait bien parti
  removeUserById: function(req,res){
    var _groupId = req.param('groupId');
    var _userId = req.param('userId');

    //Si il manque des params, on drop.
    if (!_groupId || !_userId) return res.json(400,{err:'PARAMS ERROR.'});

    Groups.findOneById(_groupId).exec(function(err,isFound) {
      if (err) return res.json(400,{err:'ERROR.'});
      if (!isFound) return res.json(400,{err:'ERROR.'});

      Users.findOneById(_userId).exec(function (err, isFound) {
        if (err) return res.json(400,{err:'ERROR.'});
        if (!isFound) return res.json(400,{err:'ERROR.'});

        GroupUsers.findOne({group: _groupId, user: _userId}).exec(function (err, groupUser) {
          if (err) return res.json(400,{err:'ERROR.'});
          if (!groupUser) return res.json(400,{err:'USER IS NOT IN GROUP.'});

          GroupUsers.destroy({id:groupUser.id}).exec(function (err, groupToDestroy){
            if (err) return res.json(400,{err:'ERROR.'});
            return res.send(groupToDestroy);
          });
        });
      });
    });
  },


  /* CONNECTED OBJECTS */

  getConnectedObjects : function(req, res){
    var groupId = req.param('groupId');

    if (!groupId) return res.json(400,{err:'No groupId param.'});

    Groups.findOne({id: groupId})
      .populate('connectedobjects')
      .exec(function(err, group){
        if (!group) return res.json(400,{err:'No group found.'});
        /*
        if (group.connectedobjects.length == 0) return res.json(400,{err:'No connectedobjects found.'});
        */

        return res.json(group.connectedobjects);
      })

  },


  // TODO - Coco
  // Associe un connectedObject à un group (selon les params)
  assignConnectedObjectById: function(req, res){
    var _groupId = req.param('groupId');
    var _conObjId = req.param('conObjId');

    //Si il manque un des params "conObjId" ou "groupId", on drop.
    if (!_groupId || !_conObjId) return res.json(400,{err:'PARAMS ERROR.'});

    Groups.findOneById(_groupId).exec(function(err,isFound){
      if (err) return res.json(400,{err:'ERROR.'});
      if (!isFound) return res.json(400,{err:'ERROR.'});

      ConnectedObjects.findOneById(_conObjId).exec(function(err,isFound) {
        if (err) return res.json(400,{err:'ERROR.'});
        if (!isFound) return res.json(400,{err:'ERROR.'});
        /*
        GroupUsers.count({group: _groupId, user: _userId}).exec(function(err, groupUser){
          if (err) return res.json(400,{err:'ERROR.'});
          if (groupUser > 0) return res.json(400,{err:'USER IS ALREADY IN GROUP.'});

          GroupUsers.create({
            group:_groupId,
            user:_userId,
            is_admin: (_isAdmin == "true"? 1 : 0),
            is_to_call: (_isToCall == "true"? 1 : 0)
          }).exec(function(err,finalGroupUser){
            if (err) return res.json(400,{err:'ERROR.'});
            return res.send(finalGroupUser);
          });
        });
        */
      });
    });
  }

};
