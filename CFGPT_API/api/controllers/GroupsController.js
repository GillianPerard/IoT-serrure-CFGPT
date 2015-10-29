/**
 * GroupsController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /* USERS */

  // Récupère les informations des users du group de l'id passé en paramètre (+ les infos associées à son groupuser)
	getUsers: function(req,res){
		//var plop = req.query.user;
    var _groupId = req.param('groupId');

		if (!_groupId) return res.json(400,{err:'No groupId param.'});

		Groups.findOne({id: _groupId}).exec(function(err, group){
			if (!group) return res.json(400,{err:'No group found.'});
			GroupUsers.find({group: group.id}).populate('user').exec(function(err, userWithGroup){
				if (userWithGroup.length == 0) return res.json(400,{err:'No groupuser found.'});
				res.send(userWithGroup);
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

    Groups.findById(_groupId).exec(function(err,isFound){
      if (err) return res.json(400,{err:'ERROR.'});
      if (isFound.length == 0) return res.json(400,{err:'ERROR.'});

      Users.findById(_userId).exec(function(err,isFound) {
        if (err) return res.json(400,{err:'ERROR.'});
        if (isFound.length == 0) return res.json(400,{err:'ERROR.'});

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

    Groups.findById(_groupId).exec(function(err,isFound) {
      if (err) return res.json(400,{err:'ERROR.'});
      if (isFound.length == 0) return res.json(400,{err:'ERROR.'});

      Users.findById(_userId).exec(function (err, isFound) {
        if (err) return res.json(400,{err:'ERROR.'});
        if (isFound.length == 0) return res.json(400,{err:'ERROR.'});

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

  }

};
